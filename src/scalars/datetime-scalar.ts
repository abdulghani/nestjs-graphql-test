import { CustomScalar, Scalar } from "@nestjs/graphql";
import {
  EnumValueNode,
  FloatValueNode,
  GraphQLError,
  GraphQLScalarLiteralParser,
  GraphQLScalarSerializer,
  GraphQLScalarValueParser,
  IntValueNode,
  Kind,
  StringValueNode,
  ValueNode,
} from "graphql";
import moment from "moment";

@Scalar("DateTime", (type) => String)
class DateTimeScalar implements CustomScalar<string, string> {
  public readonly description =
    "DateTimeScalar parsed with momentjs in UTC format";

  public readonly parseValue: GraphQLScalarValueParser<string> = (value) => {
    // UTC(TRUE) DON'T OFFSET CLIENT TIME TO UTC
    const date = moment(value).utc(true);

    if (!date.isValid) {
      throw new GraphQLError(`parseValue: invalid datetime (${value})`);
    }

    return date.toISOString();
  };

  public readonly serialize: GraphQLScalarSerializer<string> = (value) => {
    // UTC(FALSE) OFFSET SERVER TIME TO UTC
    const date = moment(value).utc(false);

    if (!date.isValid) {
      throw new GraphQLError(`serialize: invalid datetime (${value})`);
    }

    return date.toISOString();
  };

  private hasValue(
    node: ValueNode
  ): node is IntValueNode | FloatValueNode | StringValueNode | EnumValueNode {
    const checkList: string[] = [Kind.INT, Kind.FLOAT, Kind.STRING, Kind.ENUM];
    if (checkList.includes(node.kind)) {
      return true;
    }
    return false;
  }

  public readonly parseLiteral: GraphQLScalarLiteralParser<string> = (node) => {
    if (this.hasValue(node)) {
      return this.parseValue(node.value);
    }
    if (node.kind === Kind.NULL) {
      return null;
    }
    throw new GraphQLError(`parseLiteral: invalid datetime (${node.loc})`);
  };
}

export default DateTimeScalar;
