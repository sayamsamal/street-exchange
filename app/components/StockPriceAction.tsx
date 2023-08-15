interface PriceActionProp {
  shortName: string;
  symbol: string;
  price: string;
  currency: string;
  change: string;
  changePercent: string;
}

const StockPriceAction = (prop: PriceActionProp) => {
  let isPositive: boolean = Number(prop.change) >= 0;

  return (
    <div className="stock-price-action mb-8">
      <h1 className="mb-3 text-2xl font-medium">
        {prop.shortName} ({prop.symbol})
      </h1>
      <div className="flex flex-wrap gap-3">
        <div className="text-5xl font-bold">{prop.price}</div>
        <div
          className={`text-xl ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {prop.changePercent} ({prop.change})
        </div>
      </div>
    </div>
  );
};

export default StockPriceAction;
