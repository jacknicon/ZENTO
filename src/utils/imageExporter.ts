import { toPng } from 'html-to-image';

export async function exportScheduleAsImage(
  elementId: string,
  planTitle: string,
  hideGrades: boolean = true
): Promise<void> {
  const node = document.getElementById(elementId);
  if (!node) {
    alert('画像化の対象エリアが見つかりませんでした。');
    return;
  }

  // Apply grade mask class if grade masking is requested
  if (hideGrades) {
    node.classList.add('mask-grades-mode');
  }

  try {
    // Calculate full scrollable dimensions to ensure all content (even offscreen) is captured without cropping
    const width = Math.max(node.scrollWidth, node.offsetWidth, 1200);
    const height = Math.max(node.scrollHeight, node.offsetHeight);

    const dataUrl = await toPng(node, {
      quality: 0.95,
      pixelRatio: 2,
      backgroundColor: '#f8fafc',
      width: width,
      height: height,
      style: {
        overflow: 'visible',
        maxWidth: 'none',
        maxHeight: 'none',
        width: `${width}px`,
        height: `${height}px`,
        transform: 'none',
      },
    });

    const link = document.createElement('a');
    link.download = `ZENTO_履修計画_${planTitle || 'マイプラン'}_${new Date().toISOString().slice(0, 10)}.png`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error('Failed to export schedule as PNG:', error);
    alert('画像の生成中にエラーが発生しました。ブラウザの表示サイズを広げて再試行してください。');
  } finally {
    if (hideGrades) {
      node.classList.remove('mask-grades-mode');
    }
  }
}
