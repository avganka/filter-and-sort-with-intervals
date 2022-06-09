import { ChangeEvent, useState } from "react";
import "./styles.css";
import {
  removeNullsAndZeros,
  pricesToText,
  filterCourses,
  sortCourses
} from "./utils";
import { CoursesTypes } from "./types";

let courses = [
  { name: "Courses in England", prices: [0, 100] },
  { name: "Courses in Germany", prices: [500, null] },
  { name: "Courses in Italy", prices: [100, 200] },
  { name: "Courses in Russia", prices: [null, 400] },
  { name: "Courses in China", prices: [50, 250] },
  { name: "Courses in USA", prices: [200, null] },
  { name: "Courses in Kazakhstan", prices: [56, 324] },
  { name: "Courses in France", prices: [null, null] }
];

// Варианты цен (фильтры), которые ищет пользователь
// let requiredRange1 = [null, 200];
// let requiredRange2 = [100, 350];
// let requiredRange3 = [200, null];

export default function App() {
  const coursesList = removeNullsAndZeros(courses);
  const [modifiedCoursesList, setModifiedCoursesList] = useState<
    CoursesTypes[]
  >(coursesList);

  const [showTag, setShowTag] = useState(false);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const [sortingType, setSortingType] = useState("Popular");

  const onApplyFilterHandler = () => {
    setShowTag(true);

    if (min && max) {
      if (min > max) {
        setMin(min);
        setMax(min);
      }
    }

    setModifiedCoursesList(
      filterCourses(
        [min, max],
        sortCourses(sortingType, removeNullsAndZeros(courses))
      )
    );
  };

  const onSortChangeHandler = (evt: ChangeEvent<HTMLSelectElement>) => {
    setSortingType(evt.target.value);
    setModifiedCoursesList(
      sortCourses(
        evt.target.value,
        filterCourses([min, max], removeNullsAndZeros(courses))
      )
    );
  };

  return (
    <div className="App">
      <h1>Courses</h1>
      <div className="sort">
        <select
          name="sort"
          id="sort"
          value={sortingType}
          onChange={(evt) => onSortChangeHandler(evt)}
        >
          <option value="popular">Popular</option>
          <option value="from-cheap-to-expensive">
            From cheap to expensive
          </option>
          <option value="from-expensive-to-cheap">
            From expensive to cheap
          </option>
        </select>
      </div>
      {showTag && <div className="tag"></div>}
      <div className="content">
        <div className="filter">
          <p>Price</p>
          <div>
            <input
              type="number"
              value={min}
              onChange={(evt) => setMin(evt.target.value)}
            />
            <input
              type="number"
              value={max}
              onChange={(evt) => setMax(evt.target.value)}
            />
          </div>
          <button onClick={onApplyFilterHandler}>Применить</button>
          <button
            onClick={() => {
              setModifiedCoursesList(
                sortCourses(sortingType, removeNullsAndZeros(courses))
              );
              setMin("");
              setMax("");
              setShowTag(false);
            }}
          >
            Сбросить
          </button>
        </div>
        <div className="courses">
          <ul className="courses__list">
            {modifiedCoursesList.map((filter) => (
              <li key={filter.name} className="courses__item">
                <p>{filter.name}</p>
                <span>
                  Prices: <b>{pricesToText(filter.prices)}</b>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
