import app from "./app";

async function main(){
  try {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT);
    console.log("Server on port", PORT);
  } catch (error) {
    console.log("Ocurrio un error:", error)
  }
}

main();