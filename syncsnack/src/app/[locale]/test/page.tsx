export default async function Test() {
  const data2 = await fetch("http://localhost:3000/api/testy");
  const json = await data2.json();
  console.log("Json: ", json);
  return "test";
}
