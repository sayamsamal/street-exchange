import * as $protobuf from "protobufjs";
import Long = require("long");
/** QuoteType enum. */
export enum QuoteType {
    NONE = 0,
    ALTSYMBOL = 5,
    HEARTBEAT = 7,
    EQUITY = 8,
    INDEX = 9,
    MUTUALFUND = 11,
    MONEYMARKET = 12,
    OPTION = 13,
    CURRENCY = 14,
    WARRANT = 15,
    BOND = 17,
    FUTURE = 18,
    ETF = 20,
    COMMODITY = 23,
    ECNQUOTE = 28,
    CRYPTOCURRENCY = 41,
    INDICATOR = 42,
    INDUSTRY = 1000
}

/** MarketHoursType enum. */
export enum MarketHoursType {
    PRE_MARKET = 0,
    REGULAR_MARKET = 1,
    POST_MARKET = 2,
    EXTENDED_HOURS_MARKET = 3
}

/** OptionType enum. */
export enum OptionType {
    CALL = 0,
    PUT = 1
}

/** Represents a PricingData. */
export class PricingData implements IPricingData {

    /**
     * Constructs a new PricingData.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPricingData);

    /** PricingData id. */
    public id: string;

    /** PricingData price. */
    public price: number;

    /** PricingData time. */
    public time: (number|Long);

    /** PricingData currency. */
    public currency: string;

    /** PricingData exchange. */
    public exchange: string;

    /** PricingData quoteType. */
    public quoteType: QuoteType;

    /** PricingData marketHours. */
    public marketHours: MarketHoursType;

    /** PricingData changePercent. */
    public changePercent: number;

    /** PricingData dayVolume. */
    public dayVolume: (number|Long);

    /** PricingData dayHigh. */
    public dayHigh: number;

    /** PricingData dayLow. */
    public dayLow: number;

    /** PricingData change. */
    public change: number;

    /** PricingData shortName. */
    public shortName: string;

    /** PricingData expireDate. */
    public expireDate: (number|Long);

    /** PricingData openPrice. */
    public openPrice: number;

    /** PricingData previousClose. */
    public previousClose: number;

    /** PricingData strikePrice. */
    public strikePrice: number;

    /** PricingData underlyingSymbol. */
    public underlyingSymbol: string;

    /** PricingData openInterest. */
    public openInterest: (number|Long);

    /** PricingData optionsType. */
    public optionsType: OptionType;

    /** PricingData miniOption. */
    public miniOption: (number|Long);

    /** PricingData lastSize. */
    public lastSize: (number|Long);

    /** PricingData bid. */
    public bid: number;

    /** PricingData bidSize. */
    public bidSize: (number|Long);

    /** PricingData ask. */
    public ask: number;

    /** PricingData askSize. */
    public askSize: (number|Long);

    /** PricingData priceHint. */
    public priceHint: (number|Long);

    /** PricingData vol_24hr. */
    public vol_24hr: (number|Long);

    /** PricingData volAllCurrencies. */
    public volAllCurrencies: (number|Long);

    /** PricingData fromcurrency. */
    public fromcurrency: string;

    /** PricingData lastMarket. */
    public lastMarket: string;

    /** PricingData circulatingSupply. */
    public circulatingSupply: number;

    /** PricingData marketcap. */
    public marketcap: number;

    /** PricingData components. */
    public components: string;

    /**
     * Creates a new PricingData instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PricingData instance
     */
    public static create(properties?: IPricingData): PricingData;

    /**
     * Encodes the specified PricingData message. Does not implicitly {@link PricingData.verify|verify} messages.
     * @param message PricingData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPricingData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified PricingData message, length delimited. Does not implicitly {@link PricingData.verify|verify} messages.
     * @param message PricingData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPricingData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a PricingData message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PricingData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PricingData;

    /**
     * Decodes a PricingData message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PricingData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PricingData;

    /**
     * Verifies a PricingData message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a PricingData message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PricingData
     */
    public static fromObject(object: { [k: string]: any }): PricingData;

    /**
     * Creates a plain object from a PricingData message. Also converts values to other types if specified.
     * @param message PricingData
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: PricingData, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this PricingData to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for PricingData
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}
