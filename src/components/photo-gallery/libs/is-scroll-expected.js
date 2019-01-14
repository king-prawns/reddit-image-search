// @flow

/**
 * Check if there is the right offset from the bottom
 * @module components/photo-gallery/libs/is-scroll-expected
 */

type ScrollTarget = {
  oH: number,
  sY: number,
  iH: number
}

const isScrollExpectedOffset = (s: ScrollTarget, offset: number): boolean => (s.oH - s.iH - s.sY) <= offset;

export default isScrollExpectedOffset;
