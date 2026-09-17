// Share the row height with native layout so every bend meets its marker.
export function createMapRoute(rowHeight: number) {
  let route = 'M108 42';
  for (let index = 0; index < 3; index += 1) {
    const fromX = index % 2 === 0 ? 108 : 252;
    const toX = index % 2 === 0 ? 252 : 108;
    const middle = 42 + (index + .5) * rowHeight;
    route += ` C${fromX} ${middle} ${toX} ${middle} ${toX} ${42 + (index + 1) * rowHeight}`;
  }
  return 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 ' + rowHeight * 4 + '" preserveAspectRatio="none">' +
  '<g fill="none" stroke-linecap="round">' +
  '<path d="' + route + '" transform="translate(0 7)" stroke="#477f32" stroke-opacity=".25" stroke-width="30"/>' +
  '<path d="' + route + '" stroke="#649e40" stroke-width="32"/>' +
  '<path d="' + route + '" stroke="#d4e99a" stroke-width="25"/>' +
  '<path d="' + route + '" stroke="#e7f3be" stroke-width="17"/>' +
  '<path d="' + route + '" stroke="#fffef0" stroke-width="3" stroke-dasharray="5 13"/>' +
  '</g></svg>'
);
}

export function getMapLayout(windowHeight: number, navigationBottom: number, bottomInset: number) {
  // 60px single-row header; very short screens can still scroll, not clip text.
  const bottomPadding = Math.max(16, bottomInset);
  const rowHeight = Math.max(140, Math.floor((windowHeight - navigationBottom - 60 - bottomPadding) / 4));
  return { rowHeight, routeHeight: rowHeight * 4, bottomPadding, mapRoute: createMapRoute(rowHeight) };
}
