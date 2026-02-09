import type { ZodObject, ZodRawShape } from "zod";

interface EnvOptions {
  source?: NodeJS.ProcessEnv;
  serviceName?: string;
}

type SchemaOutput<TSchema extends ZodRawShape> = ZodObject<TSchema>["_output"];

/**
 * Validates environment variables using a provided Zod schema.
 *
 * This utility reads environment variables (or a custom source),
 * validates them against the given Zod object schema, and returns
 * the fully typed and validated result. If validation fails, it
 * throws a detailed error including formatted Zod validation issues.
 *
 * @template TSchema - The Zod raw shape used to define the schema.
 *
 * @param {ZodObject<TSchema>} schema
 *   The Zod schema describing the expected environment variables.
 *
 * @param {EnvOptions} [options]
 *   Optional configuration:
 *   - `source`: custom key-value object instead of `process.env`
 *   - `serviceName`: name used in error messages
 *
 * @returns {SchemaOutput<TSchema>}
 *   The validated and typed environment variable object.
 *
 * @throws {Error}
 *   Throws an error if validation fails, including formatted Zod errors.
 */
export const createEnv = <TSchema extends ZodRawShape>(
  schema: ZodObject<TSchema>,
  options: EnvOptions = {},
): SchemaOutput<TSchema> => {
  const { source = process.env, serviceName = "service" } = options;

  const parsed = schema.safeParse(source);

  if (!parsed.success) {
    const formattedErrors = parsed.error.format();
    throw new Error(
      `[${serviceName}] Environment variable validation failed: ${JSON.stringify(formattedErrors)}`,
    );
  }

  return parsed.data;
};

export type EnvSchema<TShape extends ZodRawShape> = ZodObject<TShape>;
