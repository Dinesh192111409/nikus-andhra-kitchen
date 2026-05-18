const tables = [1, 2, 3, 4, 5, 6, 7];

export default function QRPage() {
 const websiteUrl = "https://nikus-andhra-kitchen.vercel.app";

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#ff7b00] via-[#ff8c1a] to-black text-white p-6 md:p-10">
      <h1 className="text-4xl md:text-6xl font-black">
        Table QR Codes
      </h1>

      <p className="mt-4 text-orange-100">
        Print these QR codes and place one on each table.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {tables.map((table) => {
          const url = `${websiteUrl}/table/${table}`;

          const qr = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
            url
          )}`;

          return (
            <div
              key={table}
              className="bg-black/75 border border-orange-300/30 rounded-[30px] p-6 text-center shadow-2xl"
            >
              <h2 className="text-3xl font-black">Table {table}</h2>

              <img
                src={qr}
                alt={`Table ${table} QR Code`}
                className="mx-auto mt-6 rounded-2xl bg-white p-3"
              />

              <p className="mt-5 text-sm break-all text-orange-100">
                {url}
              </p>

              <a
                href={qr}
                download={`table-${table}-qr.png`}
                className="inline-block mt-6 bg-orange-500 text-black px-6 py-4 rounded-full font-black"
              >
                Download QR
              </a>
            </div>
          );
        })}
      </div>
    </main>
  );
}