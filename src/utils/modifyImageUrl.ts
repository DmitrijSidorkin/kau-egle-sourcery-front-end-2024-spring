const modifyImageUrl = (url: string, newHeight: number): string => {
  const pattern = /=w(\d+)-h(\d+)-/;
  const match = url.match(pattern);
  if (match) {
    const width = Number(match[1]);
    const height = Number(match[2]);
    const newWidth = Math.floor(width / Math.floor(height / newHeight));
    const modifiedUrl = url.replace(pattern, `=w${newWidth}-h${newHeight}-`);
    return modifiedUrl;
  }
  return '';
};
export default modifyImageUrl;
