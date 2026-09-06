import type { Course, PlanItem, PlanSlot, PrerequisiteStatus, Quarter, Year } from '../types/syllabus';

export function getQuarterRank(year: Year, quarter: Quarter): number {
  const qMap: Record<Quarter, number> = {
    '1Q': 1,
    '2Q': 2,
    '3Q': 3,
    '4Q': 4,
  };
  return (year - 1) * 4 + (qMap[quarter] || 1);
}

export function normalizeName(name: string): string {
  if (!name) return '';
  return name
    .replace(/[！-～]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xfee0))
    .replace(/\s+/g, '')
    .replace(/（/g, '(')
    .replace(/）/g, ')')
    .trim();
}

export function isQuarterAvailable(qStr: string | undefined, quarter: Quarter): boolean {
  if (!qStr || qStr === '通年' || qStr === '自由') return true;

  if (qStr.includes('1-2') && qStr.includes('3-4')) return true;

  // 1Q/3Q pair
  if (qStr.includes('1Q、3Q') || (qStr.includes('1') && qStr.includes('3') && !qStr.includes('2') && !qStr.includes('4'))) {
    return quarter === '1Q' || quarter === '3Q';
  }

  // 2Q/4Q pair
  if (qStr.includes('2Q、4Q') || (qStr.includes('2') && qStr.includes('4') && !qStr.includes('1') && !qStr.includes('3'))) {
    return quarter === '2Q' || quarter === '4Q';
  }

  // 1-2Q continuous pair
  if (qStr.includes('1-2') || qStr === '1Q、2Q') {
    return quarter === '1Q' || quarter === '2Q';
  }

  // 3-4Q continuous pair
  if (qStr.includes('3-4') || qStr === '3Q、4Q') {
    return quarter === '3Q' || quarter === '4Q';
  }

  if (quarter === '1Q' && (qStr.includes('1') || qStr.includes('春'))) return true;
  if (quarter === '2Q' && (qStr.includes('2') || qStr.includes('春'))) return true;
  if (quarter === '3Q' && (qStr.includes('3') || qStr.includes('秋'))) return true;
  if (quarter === '4Q' && (qStr.includes('4') || qStr.includes('秋'))) return true;

  return false;
}

export function validatePrerequisites(
  plan: PlanItem[],
  coursesMap: Map<string, Course>
): Map<string, PrerequisiteStatus> {
  const statusMap = new Map<string, PrerequisiteStatus>();

  const placementMap = new Map<string, { slot: PlanSlot; rank: number }>();
  for (const item of plan) {
    const norm = normalizeName(item.subjectName);
    const rank = getQuarterRank(item.year, item.quarter);
    const existing = placementMap.get(norm);
    if (!existing || rank < existing.rank) {
      placementMap.set(norm, {
        slot: { year: item.year, quarter: item.quarter },
        rank,
      });
    }
  }

  for (const item of plan) {
    const course = coursesMap.get(item.subjectName);
    const normSubject = normalizeName(item.subjectName);
    const firstPlacement = placementMap.get(normSubject);
    const targetRank = firstPlacement ? firstPlacement.rank : getQuarterRank(item.year, item.quarter);

    const missingPrereqs: string[] = [];
    const prereqsPlacedLater: string[] = [];

    if (course && course.前提必須科目 && course.前提必須科目.length > 0) {
      for (const reqRaw of course.前提必須科目) {
        if (!reqRaw || reqRaw === 'なし') continue;
        const reqList = reqRaw.includes('、') ? reqRaw.split('、') : reqRaw.includes(',') ? reqRaw.split(',') : [reqRaw];
        for (const rItem of reqList) {
          const r = rItem.trim();
          if (!r || r === 'なし') continue;
          const normReq = normalizeName(r);

          const placement = placementMap.get(normReq);
          if (!placement) {
            missingPrereqs.push(r);
          } else if (placement.rank >= targetRank) {
            prereqsPlacedLater.push(r);
          }
        }
      }
    }

    const isOk = missingPrereqs.length === 0 && prereqsPlacedLater.length === 0;

    statusMap.set(item.subjectName, {
      subjectName: item.subjectName,
      missingPrereqs,
      prereqsPlacedLater,
      isOk,
      placedSlot: { year: item.year, quarter: item.quarter },
    });
  }

  return statusMap;
}

export interface HighlightContext {
  prereqsSatisfied: Set<string>;
  prereqsMissing: Set<string>;
  successorsUnlocked: Set<string>;
}

export function getHighlightContext(
  subjectName: string,
  plan: PlanItem[],
  coursesMap: Map<string, Course>
): HighlightContext {
  const context: HighlightContext = {
    prereqsSatisfied: new Set(),
    prereqsMissing: new Set(),
    successorsUnlocked: new Set(),
  };

  const course = coursesMap.get(subjectName);
  if (!course) return context;

  const plannedNames = new Set(plan.map((p) => normalizeName(p.subjectName)));

  if (course.前提必須科目) {
    for (const reqRaw of course.前提必須科目) {
      if (!reqRaw || reqRaw === 'なし') continue;
      const reqList = reqRaw.includes('、') ? reqRaw.split('、') : reqRaw.includes(',') ? reqRaw.split(',') : [reqRaw];
      for (const rItem of reqList) {
        const req = rItem.trim();
        if (!req || req === 'なし') continue;
        if (plannedNames.has(normalizeName(req))) {
          context.prereqsSatisfied.add(req);
        } else {
          context.prereqsMissing.add(req);
        }
      }
    }
  }

  coursesMap.forEach((c) => {
    const isPrereqForThis = c.前提必須科目?.some((r) => normalizeName(r) === normalizeName(subjectName));
    const isSuccessorOfThis = course.後継推奨科目?.some((s) => normalizeName(s) === normalizeName(c.科目名));

    if (isPrereqForThis || isSuccessorOfThis) {
      context.successorsUnlocked.add(c.科目名);
    }
  });

  return context;
}
