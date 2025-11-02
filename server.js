import jsonServer from "json-server";
import auth from "json-server-auth";
import cors from "cors";

const app = jsonServer.create();
const router = jsonServer.router("db.json");
app.db = router.db;

// Rules akses
const rules = auth.rewriter({
  users: 660, // hanya admin bisa GET /users
  products: 666, // semua bisa GET, owner bisa PATCH/DELETE
  orders: 660, // user bisa lihat order sendiri, admin bisa lihat semua
  carts: 660, // user hanya bisa lihat cart miliknya sendiri
  cartItems: 660,
});

// Middleware
app.use(cors());
app.use(jsonServer.bodyParser);
app.use(rules);
app.use(auth);
app.use(router);

console.log("Data keys:", Object.keys(router.db.getState()));
// Jalankan server
app.listen(5001, () => {
  console.log("✅ JSON Server Auth berjalan di http://localhost:5001");
});
