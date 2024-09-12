export const revalidate = false;
export default async function Test() {
  console.log("this executes twice so I post double data");
  const data2 = await fetch("http://localhost:3000/api/tes", {
    next: { revalidate: 3 },
  });
  const json = await data2.json();
  console.log("Json: ", json);
  return "test";
}
