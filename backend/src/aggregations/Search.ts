export const searchBillsPipeline = (query?: string): any[] => {
  const fuzzyFilter: any = {};
  if (query) {
    fuzzyFilter["$text"] = { $search: query };
  }

  return [
    {
      $lookup: {
        from: "bills",
        as: "bill",
        pipeline: [
          {
            $match: {
              ...fuzzyFilter,
            },
          },
        ],
      },
    },
    {
      $project: {},
    },
  ];
};

export const searchPoliticiansPipeline = (query?: string): any[] => {
  const fuzzyFilter: any = {};
  if (query) {
    fuzzyFilter["$text"] = { $search: query };
  }

  return [
    {
      $lookup: {
        from: "politicians",
        as: "politician",
        pipeline: [
          {
            $match: {
              ...fuzzyFilter,
            },
          },
        ],
      },
    },
    {
      $project: {},
    },
  ];
};

export const searchStancesPipeline = (query?: string): any[] => {
  const fuzzyFilter: any = {};
  if (query) {
    fuzzyFilter["$text"] = { $search: query };
  }

  return [
    {
      $lookup: {
        from: "stances",
        as: "stance",
        pipeline: [
          {
            $match: {
              ...fuzzyFilter,
            },
          },
        ],
      },
    },
    {
      $project: {},
    },
  ];
};
