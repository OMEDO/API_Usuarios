import app from "./app";
import { AppDataSource } from "./db";

async function main(){
  try {
    const PORT = process.env.PORT || 3000;

    await AppDataSource.initialize()

    app.listen(PORT);
    console.log("App ejecutandose en el puerto", PORT);
  } catch (error) {
    console.log("Ocurrio un error:", error)
  }
}

main();