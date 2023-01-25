export default function FooterHome() {
  return (
    <footer className="footer items-center px-40 py-6 bg-neutral">
      <div className="items-center grid-flow-col">
        <p>
          {" "}
          &copy; 2021 - {new Date().getFullYear()} MexL Pay. All Rights
          Reserved.
        </p>
      </div>
      <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <p>
          +6282256964453
        </p>
        <p>
          mexlpay@mail.com
        </p>
      </div>
    </footer>
  );
}
