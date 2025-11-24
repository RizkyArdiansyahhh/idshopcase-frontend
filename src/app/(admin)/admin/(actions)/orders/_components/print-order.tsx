// import { useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import html2pdf from "html2pdf.js";

// export default function PrintOrder({ order }) {
//   const printRef = useRef();
//   const thermalRef = useRef();

//   const handlePrintA4 = () => {
//     const printContents = printRef.current.innerHTML;
//     const win = window.open("", "", "width=900,height=650");
//     win.document.write(`
//       <html>
//         <head>
//           <title>Print Order</title>
//           <style>
//             body { font-family: Arial, sans-serif; padding: 20px; }
//             .section { margin-bottom: 16px; }
//             table { width: 100%; border-collapse: collapse; margin-top: 10px; }
//             th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
//             th { background: #f5f5f5; }
//           </style>
//         </head>
//         <body>${printContents}</body>
//       </html>
//     `);
//     win.document.close();
//     win.print();
//   };

//   const handlePrintThermal = () => {
//     const printContents = thermalRef.current.innerHTML;
//     const win = window.open("", "", "width=300,height=600");
//     win.document.write(`
//       <html>
//         <head><title>Print Struk</title></head>
//         <body>${printContents}</body>
//       </html>
//     `);
//     win.document.close();
//     win.print();
//   };

//   const exportThermalPDF = () => {
//     const element = thermalRef.current;
//     const opt = {
//       margin: 0,
//       filename: `struk-order-${order.id}.pdf`,
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: "px", format: [230, "auto"], orientation: "portrait" },
//     };
//     html2pdf().set(opt).from(element).save();
//   };

//   return (
//     <div>
//       {/* Buttons */}
//       <div className="flex gap-3 mb-4">
//         <Button onClick={handlePrintA4}>Print A4</Button>
//         <Button onClick={handlePrintThermal}>Print Struk</Button>
//         <Button onClick={exportThermalPDF}>Export PDF Thermal</Button>
//       </div>

//       {/* A4 Layout */}
//       <Card ref={printRef} className="p-4 shadow mb-8">
//         <CardContent>
//           <h2 className="text-xl font-bold mb-4">Order Detail</h2>

//           <div className="section">
//             <h3 className="font-semibold">Informasi Order</h3>
//             <p>ID Order: {order.id}</p>
//             <p>Status: {order.status}</p>
//             <p>Metode Pembayaran: {order.payment_method}</p>
//             <p>Total Harga: Rp {Number(order.total_price).toLocaleString()}</p>
//             <p>Dibuat Pada: {new Date(order.createdAt).toLocaleString()}</p>
//           </div>

//           <div className="section">
//             <h3 className="font-semibold">Customer</h3>
//             <p>Nama: {order.User.name}</p>
//             <p>Email: {order.User.email}</p>
//             <p>Telepon: {order.User.phone}</p>
//           </div>

//           <div className="section">
//             <h3 className="font-semibold">Alamat Pengiriman</h3>
//             <p>Penerima: {order.Address.recipient_name}</p>
//             <p>Telepon: {order.Address.phone}</p>
//             <p>
//               {order.Address.district}, {order.Address.city}
//             </p>
//             <p>
//               {order.Address.province}, {order.Address.postal_code}
//             </p>
//           </div>

//           <div className="section">
//             <h3 className="font-semibold">Produk Dipesan</h3>
//             <table>
//               <thead>
//                 <tr>
//                   <th>Produk</th>
//                   <th>Material</th>
//                   <th>Qty</th>
//                   <th>Harga</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {order.OrderItems.map((item) => (
//                   <tr key={item.id}>
//                     <td>{item.Product.name}</td>
//                     <td>{item.Material?.name || "-"}</td>
//                     <td>{item.quantity}</td>
//                     <td>Rp {Number(item.price).toLocaleString()}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Thermal Receipt Layout */}
//       <div
//         ref={thermalRef}
//         style={{ width: "230px", fontFamily: "monospace", fontSize: "12px" }}
//       >
//         <div style={{ textAlign: "center" }}>
//           <strong>ID SHOP CASE</strong>
//           <br />
//           ---
//           <br />
//           Order ID: {order.id}
//           <br />
//           {new Date(order.createdAt).toLocaleString()}
//           <br />
//           <hr />
//         </div>

//         {order.OrderItems.map((item) => (
//           <div
//             key={item.id}
//             style={{ display: "flex", justifyContent: "space-between" }}
//           >
//             <span>{item.Product.name}</span>
//             <span>{Number(item.price).toLocaleString()}</span>
//           </div>
//         ))}

//         <hr />

//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             fontWeight: "bold",
//           }}
//         >
//           <span>Total</span>
//           <span>Rp {Number(order.total_price).toLocaleString()}</span>
//         </div>

//         <hr />

//         <div style={{ textAlign: "center", marginTop: "10px" }}>
//           Terima kasih!
//         </div>
//       </div>
//     </div>
//   );
// }
