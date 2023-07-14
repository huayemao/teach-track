import { SchoolInfo, TeacherInfo } from "@/utils/process";
import localforage from "localforage";
export async function getGradeResults(grades: number[]): Record<
  number,
  {
    teachers: TeacherInfo[] | undefined;
    schools: SchoolInfo[] | undefined;
  }
> {
  const entries = await Promise.all(
    grades.map(async (grade) => {
      const [teachers, schools] = await Promise.all(
        ["teachers", "schools"].map((e) =>
          localforage.getItem([grade, e].join("-"))
        )
      );
      return [
        grade,
        {
          teachers,
          schools,
        },
      ];
    })
  );
  return Object.fromEntries(entries);
}
