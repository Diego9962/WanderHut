import app from "./app.js";
import {connectDB} from "./db.js";

connectDB();

app.listen(3000, () => {
  console.log("Server started at port", 3000);
});
