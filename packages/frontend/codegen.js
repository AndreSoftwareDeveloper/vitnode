import { join } from 'path';
import * as dotenv from 'dotenv';
dotenv.config({
    path: join(process.cwd(), '..', '..', '.env'),
});
const config = {
    overwrite: true,
    schema: `${process.env.NEXT_PUBLIC_GRAPHQL_URL ?? 'http://localhost:8080'}/graphql`,
    documents: [join(process.cwd(), '..', 'frontend', 'src/graphql/**/*.gql')],
    generates: {
        ['./src/graphql/code.ts']: {
            plugins: [
                'typescript',
                'typescript-operations',
                'typescript-document-nodes',
            ],
            config: {
                scalars: {
                    DateTime: 'Date',
                },
                enumsAsConst: true,
                allowEnumStringTypes: true,
                namingConvention: {
                    enumValues: 'change-case-all#lowerCase',
                },
            },
        },
    },
};
export default config;