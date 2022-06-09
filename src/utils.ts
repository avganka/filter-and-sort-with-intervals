import { Price, CoursesTypes } from "./types";

export function pricesToText(prices: Price[]) {
  if (prices[0] === 0 && prices[1] !== Infinity) {
    return `from ${prices[0]} to ${prices[1]}`;
  }

  if (prices[1] === Infinity && prices[0] !== 0) {
    return `from ${prices[0]}`;
  }

  if (prices[0] === 0 && prices[1] === Infinity) {
    return "from 0";
  }
  return `from ${prices[0]} to ${prices[1]}`;
}

export function removeNullsAndZeros(courses: CoursesTypes[]) {
  return courses.map((course) => {
    if (course.prices[0] === null) {
      course.prices[0] = 0;
    }
    if (course.prices[1] === null) {
      course.prices[1] = Infinity;
    }
    return course;
  });
}

export function filterCourses(range: string[], courses: CoursesTypes[]) {
  const min = Number(range[0]) || 0;
  const max = Number(range[1]) || Infinity;

  return courses.filter((course) => {
    if (course.prices[0] === null || course.prices[0] === 0) {
      course.prices[0] = 0;
    }
    if (course.prices[1] === null) {
      course.prices[1] = Infinity;
    }

    return (
      (min <= course.prices[0] && max >= course.prices[1]) ||
      (min >= course.prices[0] && min <= course.prices[1]) ||
      (max >= course.prices[0] && max <= course.prices[1])
    );
  });
}

export function sortCourses(sortingType: string, courses: CoursesTypes[]) {
  switch (sortingType) {
    case "from-cheap-to-expensive":
      return courses
        .slice()
        .sort(
          (a, b) =>
            Math.min(a.prices[0]!, a.prices[1]!) -
            Math.min(b.prices[0]!, b.prices[1]!)
        );
    case "from-expensive-to-cheap":
      return courses
        .slice()
        .sort(
          (a, b) =>
            Math.max(b.prices[0]!, b.prices[1]!) -
            Math.max(a.prices[0]!, a.prices[1]!)
        );
    case "popular":
      return courses;
    default:
      return courses;
  }
}
