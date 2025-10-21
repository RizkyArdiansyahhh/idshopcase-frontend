import jsonServer from "json-server";
import auth from "json-server-auth";
import cors from "cors";

const app = jsonServer.create();
const router = jsonServer.router("db.json");
app.db = router.db;

// Rules akses
const rules = auth.rewriter({
  users: 600, // hanya admin bisa GET /users
  products: 644, // semua bisa GET, owner bisa PATCH/DELETE
  orders: 660, // user bisa lihat order sendiri, admin bisa lihat semua
});

// Middleware
app.use(cors());
app.use(jsonServer.bodyParser);
app.use(rules);
app.use(auth);
app.use(router);

// Jalankan server
app.listen(5001, () => {
  console.log("✅ JSON Server Auth berjalan di http://localhost:5001");
});
