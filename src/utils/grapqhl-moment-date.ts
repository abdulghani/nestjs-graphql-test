import { GraphQLError, GraphQLScalarType } from "graphql";
import moment from "moment";

const GraphQLMomentDate = new GraphQLScalarType({
  name: "GraphQLMomentDate",
  description: "Graphql date scalar. parsed with momentjs",
  serialize: function (value: any) {
    const date = moment(value).utc();

    if (!date.isValid) {
      throw new GraphQLError(`serialize: invalid date (${value})`);
    }

    return date.toISOString();
  },
  parseValue: function (value: any) {
    // UTC(TRUE) DO NOT OFFSET DATE BY SERVER TIME
    const date = moment(value).utc(true);

    if (!date.isValid) {
      throw new GraphQLError(`parseValue: invalid date (${value})`);
    }

    return date.toISOString();
  },
});

export default GraphQLMomentDate;
