import DungeonsOfEternityIndexes from "./DungeonsOfEternityIndexes";
import DungeonsOfEternityCatalog from "./DungeonsOfEternityCatalog";
import DungeonsOfEternityStatistics from "./DungeonsOfEternityStatistics";

export * from "./DungeonsOfEternityPerkMatrices";

export type DOEReport = {
  rowID: number;
  Name: string;
  Group: string;
  Rarity: string;
  Damage: number;
  Cost: number;
  DamageType: string;
  perks: string;
};

export default class DungeonsOfEternityCache {
  drops: DOEReport[];
  indexes: DungeonsOfEternityIndexes;
  catalog: DungeonsOfEternityCatalog;
  statistics: DungeonsOfEternityStatistics;

  static DungeonsOfEternityCacheSingleton: DungeonsOfEternityCache = null;

  constructor(drops: DOEReport[] = []) {
    DungeonsOfEternityCache.DungeonsOfEternityCacheSingleton = this;
    this.drops = drops;
    this.indexes = new DungeonsOfEternityIndexes(this.drops);
    this.catalog = new DungeonsOfEternityCatalog(this.indexes);
    this.statistics = new DungeonsOfEternityStatistics(
      this.drops,
      this.indexes,
    );
  }

  static async Factory(): Promise<DungeonsOfEternityCache> {
    const json = await this.FetchReports();
    return new DungeonsOfEternityCache(json);
  }

  static async FetchReports(): Promise<DOEReport[]> {
    const url = new URL("http://localhost");
    url.port = 3001;
    url.pathname = "/reports";
    const fetched = await fetch(url, {
      method: "GET",
      next: { revalidate: 3600 },
    });
    return fetched.json();
  }
}