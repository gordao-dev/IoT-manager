interface IOffsetPaginationConfig {
  minPage: number;
  maxLimit: number;
}

const offsetPaginationConfig: IOffsetPaginationConfig = {
  minPage: 1,
  maxLimit: 100,
};

export default offsetPaginationConfig;
