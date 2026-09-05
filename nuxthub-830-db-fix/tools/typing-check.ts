import { db as dbPkg, schema as schemaPkg } from '@nuxthub/db'
import { db as dbVirtual, schema as schemaVirtual } from 'hub:db'

type IsAny<T> = 0 extends (1 & T) ? true : false
type Expect<T extends true> = T

type NotAny<T> = IsAny<T> extends true ? false : true

type _db_pkg_not_any = Expect<NotAny<typeof dbPkg>>
type _schema_pkg_not_any = Expect<NotAny<typeof schemaPkg>>
type _db_virtual_not_any = Expect<NotAny<typeof dbVirtual>>
type _schema_virtual_not_any = Expect<NotAny<typeof schemaVirtual>>

type _todos_1 = typeof schemaPkg.todos
type _todos_2 = typeof schemaVirtual.todos

