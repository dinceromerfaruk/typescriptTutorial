//// UTILITY TYPES \\\\\\\\\\\\\\\\\\\

//Partial
interface Assigment {
  studentId: string;
  title: string;
  grade: number;
  verified?: boolean;
}
const updateAssigment = (
  assign: Assigment,
  propstoUpdate: Partial<Assigment>
): Assigment => {
  return { ...assign, ...propstoUpdate };
};

const assign1: Assigment = {
  studentId: "compsci123",
  title: "Final Project",
  grade: 0,
};
console.log(updateAssigment(assign1, { grade: 95 }));
const assignGraded: Assigment = updateAssigment(assign1, { grade: 95 });
//Required and Readonly
const recordAssignment = (assign: Required<Assigment>): Assigment => {
  //send to database etc.
  return assign;
};

const assignVerified: Readonly<Assigment> = { ...assignGraded, verified: true };
recordAssignment({ ...assignGraded, verified: true });

//Record
const hexColorMap: Record<string, string> = {
  red: "FF0000",
  green: "00FF00",
  blue: "0000FF",
};
type Students = "Sara" | "Kelly";
type LetterGrades = "A" | "B" | "C" | "D" | "U";

const finalGrades: Record<Students, LetterGrades> = {
  Sara: "B",
  Kelly: "D",
};

interface Grades {
  assign1: number;
  assign2: number;
}
const gradeData: Record<Students, Grades> = {
  Sara: { assign1: 85, assign2: 93 },
  Kelly: { assign1: 55, assign2: 43 },
};

//Pick and Omit

type AssignResult = Pick<Assigment, "studentId" | "grade">;
const score: AssignResult = {
  studentId: "k123",
  grade: 85,
};

type AssignPreview = Omit<Assigment, "grade" | "verified">;
const perview: AssignPreview = {
  studentId: "K123",
  title: "Final Project",
};

//Exclude and Extract

type adjustedGrade = Exclude<LetterGrades, "U">; // => A or B or C or D
type highGrades = Extract<LetterGrades, "A" | "B">; // =>A or B

//NonNullable
type AllPossibleGrades = "Dave" | "John" | null | undefined;
type NamesOnly = NonNullable<AllPossibleGrades>; // => Dave Or John

//ReturnType Fonksiyondan type çıkarmak için
//type newAssign = { title: string; points: number };
const createNewAssign = (title: string, points: number) => {
  return { title, points };
};
type NewAssign = ReturnType<typeof createNewAssign>;
const tsAssign: NewAssign = createNewAssign("Utility Types", 100);
console.log(tsAssign);

// Parameters metodun parametrelerinden type üretmek için
type AssignParams = Parameters<typeof createNewAssign>;

const assignArgs: AssignParams = ["Generics", 100];
const tsAssign2: NewAssign = createNewAssign(...assignArgs);

console.log(tsAssign2);

//Awaited -Promise in ReturnType ını almak için
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}
const fetchusers = async (): Promise<User[]> => {
  const data = await fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      if (err instanceof Error) {
        console.log(err.message);
      }
    });
  return data;
};

type FetchUsersReturnType = ReturnType<typeof fetchusers>;
type FetchUsersReturnTypeAwaited = Awaited<ReturnType<typeof fetchusers>>;
