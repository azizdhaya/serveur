
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model Projet
 * 
 */
export type Projet = $Result.DefaultSelection<Prisma.$ProjetPayload>
/**
 * Model Echeance
 * 
 */
export type Echeance = $Result.DefaultSelection<Prisma.$EcheancePayload>
/**
 * Model ActionLog
 * 
 */
export type ActionLog = $Result.DefaultSelection<Prisma.$ActionLogPayload>
/**
 * Model Societe
 * 
 */
export type Societe = $Result.DefaultSelection<Prisma.$SocietePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  TECHNICIEN: 'TECHNICIEN',
  COMMERCIAL: 'COMMERCIAL'
};

export type Role = (typeof Role)[keyof typeof Role]


export const EtatDossier: {
  OUVERT: 'OUVERT',
  EN_NEGOCIATION: 'EN_NEGOCIATION',
  FINIE: 'FINIE',
  ARCHIVE: 'ARCHIVE',
  ABANDONNE: 'ABANDONNE'
};

export type EtatDossier = (typeof EtatDossier)[keyof typeof EtatDossier]


export const StatutApprobation: {
  APPROUVE: 'APPROUVE',
  PAS_ENCORE: 'PAS_ENCORE',
  NEANT: 'NEANT',
  EN_ATTENTE: 'EN_ATTENTE',
  REJETE: 'REJETE',
  ABANDONNE: 'ABANDONNE'
};

export type StatutApprobation = (typeof StatutApprobation)[keyof typeof StatutApprobation]


export const TypeContrat: {
  PROGRAMME_PROSOL: 'PROGRAMME_PROSOL',
  HORS_PROGRAMME_PROSOL: 'HORS_PROGRAMME_PROSOL'
};

export type TypeContrat = (typeof TypeContrat)[keyof typeof TypeContrat]


export const TypeCompteur: {
  MONOPHASE: 'MONOPHASE',
  TRIPHASE: 'TRIPHASE'
};

export type TypeCompteur = (typeof TypeCompteur)[keyof typeof TypeCompteur]


export const TypeProjet: {
  PHOTOVOLTAIQUE_CLASSIQUE: 'PHOTOVOLTAIQUE_CLASSIQUE',
  POMPAGE: 'POMPAGE',
  ISOLE_AVEC_BATTERIES: 'ISOLE_AVEC_BATTERIES',
  AUTRE: 'AUTRE'
};

export type TypeProjet = (typeof TypeProjet)[keyof typeof TypeProjet]


export const ClassementDossier: {
  ARCHIVE: 'ARCHIVE',
  NON_ARCHIVE: 'NON_ARCHIVE'
};

export type ClassementDossier = (typeof ClassementDossier)[keyof typeof ClassementDossier]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type EtatDossier = $Enums.EtatDossier

export const EtatDossier: typeof $Enums.EtatDossier

export type StatutApprobation = $Enums.StatutApprobation

export const StatutApprobation: typeof $Enums.StatutApprobation

export type TypeContrat = $Enums.TypeContrat

export const TypeContrat: typeof $Enums.TypeContrat

export type TypeCompteur = $Enums.TypeCompteur

export const TypeCompteur: typeof $Enums.TypeCompteur

export type TypeProjet = $Enums.TypeProjet

export const TypeProjet: typeof $Enums.TypeProjet

export type ClassementDossier = $Enums.ClassementDossier

export const ClassementDossier: typeof $Enums.ClassementDossier

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P]): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number }): $Utils.JsPromise<R>

  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): Prisma.PrismaPromise<Prisma.JsonObject>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.projet`: Exposes CRUD operations for the **Projet** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projets
    * const projets = await prisma.projet.findMany()
    * ```
    */
  get projet(): Prisma.ProjetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.echeance`: Exposes CRUD operations for the **Echeance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Echeances
    * const echeances = await prisma.echeance.findMany()
    * ```
    */
  get echeance(): Prisma.EcheanceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.actionLog`: Exposes CRUD operations for the **ActionLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ActionLogs
    * const actionLogs = await prisma.actionLog.findMany()
    * ```
    */
  get actionLog(): Prisma.ActionLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.societe`: Exposes CRUD operations for the **Societe** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Societes
    * const societes = await prisma.societe.findMany()
    * ```
    */
  get societe(): Prisma.SocieteDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Session: 'Session',
    Projet: 'Projet',
    Echeance: 'Echeance',
    ActionLog: 'ActionLog',
    Societe: 'Societe'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "session" | "projet" | "echeance" | "actionLog" | "societe"
      txIsolationLevel: never
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.UserFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.UserAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.SessionFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.SessionAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      Projet: {
        payload: Prisma.$ProjetPayload<ExtArgs>
        fields: Prisma.ProjetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjetPayload>
          }
          findFirst: {
            args: Prisma.ProjetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjetPayload>
          }
          findMany: {
            args: Prisma.ProjetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjetPayload>[]
          }
          create: {
            args: Prisma.ProjetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjetPayload>
          }
          createMany: {
            args: Prisma.ProjetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProjetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjetPayload>
          }
          update: {
            args: Prisma.ProjetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjetPayload>
          }
          deleteMany: {
            args: Prisma.ProjetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProjetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjetPayload>
          }
          aggregate: {
            args: Prisma.ProjetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProjet>
          }
          groupBy: {
            args: Prisma.ProjetGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjetGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.ProjetFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.ProjetAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.ProjetCountArgs<ExtArgs>
            result: $Utils.Optional<ProjetCountAggregateOutputType> | number
          }
        }
      }
      Echeance: {
        payload: Prisma.$EcheancePayload<ExtArgs>
        fields: Prisma.EcheanceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EcheanceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EcheancePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EcheanceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EcheancePayload>
          }
          findFirst: {
            args: Prisma.EcheanceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EcheancePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EcheanceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EcheancePayload>
          }
          findMany: {
            args: Prisma.EcheanceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EcheancePayload>[]
          }
          create: {
            args: Prisma.EcheanceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EcheancePayload>
          }
          createMany: {
            args: Prisma.EcheanceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.EcheanceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EcheancePayload>
          }
          update: {
            args: Prisma.EcheanceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EcheancePayload>
          }
          deleteMany: {
            args: Prisma.EcheanceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EcheanceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EcheanceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EcheancePayload>
          }
          aggregate: {
            args: Prisma.EcheanceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEcheance>
          }
          groupBy: {
            args: Prisma.EcheanceGroupByArgs<ExtArgs>
            result: $Utils.Optional<EcheanceGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.EcheanceFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.EcheanceAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.EcheanceCountArgs<ExtArgs>
            result: $Utils.Optional<EcheanceCountAggregateOutputType> | number
          }
        }
      }
      ActionLog: {
        payload: Prisma.$ActionLogPayload<ExtArgs>
        fields: Prisma.ActionLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActionLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActionLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionLogPayload>
          }
          findFirst: {
            args: Prisma.ActionLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActionLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionLogPayload>
          }
          findMany: {
            args: Prisma.ActionLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionLogPayload>[]
          }
          create: {
            args: Prisma.ActionLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionLogPayload>
          }
          createMany: {
            args: Prisma.ActionLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ActionLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionLogPayload>
          }
          update: {
            args: Prisma.ActionLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionLogPayload>
          }
          deleteMany: {
            args: Prisma.ActionLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActionLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ActionLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionLogPayload>
          }
          aggregate: {
            args: Prisma.ActionLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActionLog>
          }
          groupBy: {
            args: Prisma.ActionLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActionLogGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.ActionLogFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.ActionLogAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.ActionLogCountArgs<ExtArgs>
            result: $Utils.Optional<ActionLogCountAggregateOutputType> | number
          }
        }
      }
      Societe: {
        payload: Prisma.$SocietePayload<ExtArgs>
        fields: Prisma.SocieteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SocieteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocietePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SocieteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocietePayload>
          }
          findFirst: {
            args: Prisma.SocieteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocietePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SocieteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocietePayload>
          }
          findMany: {
            args: Prisma.SocieteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocietePayload>[]
          }
          create: {
            args: Prisma.SocieteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocietePayload>
          }
          createMany: {
            args: Prisma.SocieteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SocieteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocietePayload>
          }
          update: {
            args: Prisma.SocieteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocietePayload>
          }
          deleteMany: {
            args: Prisma.SocieteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SocieteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SocieteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocietePayload>
          }
          aggregate: {
            args: Prisma.SocieteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSociete>
          }
          groupBy: {
            args: Prisma.SocieteGroupByArgs<ExtArgs>
            result: $Utils.Optional<SocieteGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.SocieteFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.SocieteAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.SocieteCountArgs<ExtArgs>
            result: $Utils.Optional<SocieteCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $runCommandRaw: {
          args: Prisma.InputJsonObject,
          result: Prisma.JsonObject
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    session?: SessionOmit
    projet?: ProjetOmit
    echeance?: EcheanceOmit
    actionLog?: ActionLogOmit
    societe?: SocieteOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    sessions: number
    projets: number
    logs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    projets?: boolean | UserCountOutputTypeCountProjetsArgs
    logs?: boolean | UserCountOutputTypeCountLogsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProjetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjetWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActionLogWhereInput
  }


  /**
   * Count Type ProjetCountOutputType
   */

  export type ProjetCountOutputType = {
    echeances: number
    logs: number
  }

  export type ProjetCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    echeances?: boolean | ProjetCountOutputTypeCountEcheancesArgs
    logs?: boolean | ProjetCountOutputTypeCountLogsArgs
  }

  // Custom InputTypes
  /**
   * ProjetCountOutputType without action
   */
  export type ProjetCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjetCountOutputType
     */
    select?: ProjetCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjetCountOutputType without action
   */
  export type ProjetCountOutputTypeCountEcheancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EcheanceWhereInput
  }

  /**
   * ProjetCountOutputType without action
   */
  export type ProjetCountOutputTypeCountLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActionLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    nom: string | null
    prenom: string | null
    email: string | null
    telephone: string | null
    password: string | null
    role: $Enums.Role | null
    actif: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    createdBy: string | null
    lastLoginAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    nom: string | null
    prenom: string | null
    email: string | null
    telephone: string | null
    password: string | null
    role: $Enums.Role | null
    actif: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    createdBy: string | null
    lastLoginAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    nom: number
    prenom: number
    email: number
    telephone: number
    password: number
    role: number
    actif: number
    createdAt: number
    updatedAt: number
    createdBy: number
    lastLoginAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    nom?: true
    prenom?: true
    email?: true
    telephone?: true
    password?: true
    role?: true
    actif?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    lastLoginAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    nom?: true
    prenom?: true
    email?: true
    telephone?: true
    password?: true
    role?: true
    actif?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    lastLoginAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    nom?: true
    prenom?: true
    email?: true
    telephone?: true
    password?: true
    role?: true
    actif?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    lastLoginAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    nom: string
    prenom: string
    email: string
    telephone: string | null
    password: string
    role: $Enums.Role
    actif: boolean
    createdAt: Date
    updatedAt: Date
    createdBy: string | null
    lastLoginAt: Date | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    prenom?: boolean
    email?: boolean
    telephone?: boolean
    password?: boolean
    role?: boolean
    actif?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    lastLoginAt?: boolean
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    projets?: boolean | User$projetsArgs<ExtArgs>
    logs?: boolean | User$logsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    nom?: boolean
    prenom?: boolean
    email?: boolean
    telephone?: boolean
    password?: boolean
    role?: boolean
    actif?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    lastLoginAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nom" | "prenom" | "email" | "telephone" | "password" | "role" | "actif" | "createdAt" | "updatedAt" | "createdBy" | "lastLoginAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    projets?: boolean | User$projetsArgs<ExtArgs>
    logs?: boolean | User$logsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      projets: Prisma.$ProjetPayload<ExtArgs>[]
      logs: Prisma.$ActionLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nom: string
      prenom: string
      email: string
      telephone: string | null
      password: string
      role: $Enums.Role
      actif: boolean
      createdAt: Date
      updatedAt: Date
      createdBy: string | null
      lastLoginAt: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * @param {UserFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const user = await prisma.user.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: UserFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a User.
     * @param {UserAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const user = await prisma.user.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: UserAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    projets<T extends User$projetsArgs<ExtArgs> = {}>(args?: Subset<T, User$projetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    logs<T extends User$logsArgs<ExtArgs> = {}>(args?: Subset<T, User$logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActionLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly nom: FieldRef<"User", 'String'>
    readonly prenom: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly telephone: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly actif: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly createdBy: FieldRef<"User", 'String'>
    readonly lastLoginAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User findRaw
   */
  export type UserFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * User aggregateRaw
   */
  export type UserAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.projets
   */
  export type User$projetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Projet
     */
    select?: ProjetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Projet
     */
    omit?: ProjetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjetInclude<ExtArgs> | null
    where?: ProjetWhereInput
    orderBy?: ProjetOrderByWithRelationInput | ProjetOrderByWithRelationInput[]
    cursor?: ProjetWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjetScalarFieldEnum | ProjetScalarFieldEnum[]
  }

  /**
   * User.logs
   */
  export type User$logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionLog
     */
    select?: ActionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionLog
     */
    omit?: ActionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionLogInclude<ExtArgs> | null
    where?: ActionLogWhereInput
    orderBy?: ActionLogOrderByWithRelationInput | ActionLogOrderByWithRelationInput[]
    cursor?: ActionLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActionLogScalarFieldEnum | ActionLogScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    refreshToken: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    refreshToken: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    userId: number
    refreshToken: number
    expiresAt: number
    createdAt: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    userId?: true
    refreshToken?: true
    expiresAt?: true
    createdAt?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    userId?: true
    refreshToken?: true
    expiresAt?: true
    createdAt?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    userId?: true
    refreshToken?: true
    expiresAt?: true
    createdAt?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    userId: string
    refreshToken: string
    expiresAt: Date
    createdAt: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    refreshToken?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>



  export type SessionSelectScalar = {
    id?: boolean
    userId?: boolean
    refreshToken?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "refreshToken" | "expiresAt" | "createdAt", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      refreshToken: string
      expiresAt: Date
      createdAt: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * @param {SessionFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const session = await prisma.session.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: SessionFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Session.
     * @param {SessionAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const session = await prisma.session.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: SessionAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly refreshToken: FieldRef<"Session", 'String'>
    readonly expiresAt: FieldRef<"Session", 'DateTime'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session findRaw
   */
  export type SessionFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Session aggregateRaw
   */
  export type SessionAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model Projet
   */

  export type AggregateProjet = {
    _count: ProjetCountAggregateOutputType | null
    _avg: ProjetAvgAggregateOutputType | null
    _sum: ProjetSumAggregateOutputType | null
    _min: ProjetMinAggregateOutputType | null
    _max: ProjetMaxAggregateOutputType | null
  }

  export type ProjetAvgAggregateOutputType = {
    nbModules: number | null
    nbOnduleurs: number | null
  }

  export type ProjetSumAggregateOutputType = {
    nbModules: number | null
    nbOnduleurs: number | null
  }

  export type ProjetMinAggregateOutputType = {
    id: string | null
    codeBarres: string | null
    reference: string | null
    abonnes: string | null
    email: string | null
    cin: string | null
    contact: string | null
    coordonneesGps: string | null
    adresseLieuImplantation: string | null
    presenteParMF: string | null
    district: string | null
    gouvernorat: string | null
    delegation: string | null
    municipalite: string | null
    typeProjet: $Enums.TypeProjet | null
    etatDossier: $Enums.EtatDossier | null
    classementDossier: $Enums.ClassementDossier | null
    commentaire: string | null
    approbationCommerciale: $Enums.StatutApprobation | null
    approbationTechnique: $Enums.StatutApprobation | null
    executionInstallation: string | null
    reception: string | null
    procesVerbal: string | null
    contratAchat: $Enums.TypeContrat | null
    montantFinancement: string | null
    tauxInteret: string | null
    banque: string | null
    agentCommercialId: string | null
    agentCommercialAutre: string | null
    puissanceInstallee: string | null
    typeCompteur: $Enums.TypeCompteur | null
    numeroCompteur: string | null
    calibreDisjoncteur: string | null
    puissanceSouscrite: string | null
    productionPrevisionnelle: string | null
    consommationAnnuelle: string | null
    nbModules: number | null
    puUnitairePV: string | null
    marquePV: string | null
    modelePV: string | null
    nbOnduleurs: number | null
    puUnitaireOnd: string | null
    puOndSiAutreW: string | null
    marqueOnd: string | null
    modeleOnd: string | null
    autreModeleOnd: string | null
    equipementSurMesure: string | null
    interventionSurMesure: string | null
    rapportPuissance: string | null
    dateDepotDossier: Date | null
    dateApprobation: Date | null
    dateInstallation: Date | null
    dateDepotDemandeMES: Date | null
    datePaiementPoseCompteurProsol: Date | null
    dateMES: Date | null
    nPolice: string | null
    nLotDebProsol: string | null
    saisieProsol: string | null
    nLotDeblocageSubvention: string | null
    deblocageProsol: string | null
    conditionSubvention: string | null
    saisieSubvention: string | null
    deblocageSubvention: string | null
    nDevis: string | null
    dateDevis: Date | null
    nFacture: string | null
    dateFacture: Date | null
    montantHT: string | null
    tva: string | null
    montantTTC: string | null
    montantTTCFinal: string | null
    montantAutofinancement: string | null
    fraisPoseCmptProsol: string | null
    paiement1erFactureSTEG: string | null
    paiement2emeFactureSTEG: string | null
    fraisAugmentationCalibre: string | null
    fraisMutationElec: string | null
    fraisMutationGaz: string | null
    fraisPassageMonoTri: string | null
    autresFrais: string | null
    reglementClient: string | null
    resteAPayer: string | null
    subventionDemandee: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjetMaxAggregateOutputType = {
    id: string | null
    codeBarres: string | null
    reference: string | null
    abonnes: string | null
    email: string | null
    cin: string | null
    contact: string | null
    coordonneesGps: string | null
    adresseLieuImplantation: string | null
    presenteParMF: string | null
    district: string | null
    gouvernorat: string | null
    delegation: string | null
    municipalite: string | null
    typeProjet: $Enums.TypeProjet | null
    etatDossier: $Enums.EtatDossier | null
    classementDossier: $Enums.ClassementDossier | null
    commentaire: string | null
    approbationCommerciale: $Enums.StatutApprobation | null
    approbationTechnique: $Enums.StatutApprobation | null
    executionInstallation: string | null
    reception: string | null
    procesVerbal: string | null
    contratAchat: $Enums.TypeContrat | null
    montantFinancement: string | null
    tauxInteret: string | null
    banque: string | null
    agentCommercialId: string | null
    agentCommercialAutre: string | null
    puissanceInstallee: string | null
    typeCompteur: $Enums.TypeCompteur | null
    numeroCompteur: string | null
    calibreDisjoncteur: string | null
    puissanceSouscrite: string | null
    productionPrevisionnelle: string | null
    consommationAnnuelle: string | null
    nbModules: number | null
    puUnitairePV: string | null
    marquePV: string | null
    modelePV: string | null
    nbOnduleurs: number | null
    puUnitaireOnd: string | null
    puOndSiAutreW: string | null
    marqueOnd: string | null
    modeleOnd: string | null
    autreModeleOnd: string | null
    equipementSurMesure: string | null
    interventionSurMesure: string | null
    rapportPuissance: string | null
    dateDepotDossier: Date | null
    dateApprobation: Date | null
    dateInstallation: Date | null
    dateDepotDemandeMES: Date | null
    datePaiementPoseCompteurProsol: Date | null
    dateMES: Date | null
    nPolice: string | null
    nLotDebProsol: string | null
    saisieProsol: string | null
    nLotDeblocageSubvention: string | null
    deblocageProsol: string | null
    conditionSubvention: string | null
    saisieSubvention: string | null
    deblocageSubvention: string | null
    nDevis: string | null
    dateDevis: Date | null
    nFacture: string | null
    dateFacture: Date | null
    montantHT: string | null
    tva: string | null
    montantTTC: string | null
    montantTTCFinal: string | null
    montantAutofinancement: string | null
    fraisPoseCmptProsol: string | null
    paiement1erFactureSTEG: string | null
    paiement2emeFactureSTEG: string | null
    fraisAugmentationCalibre: string | null
    fraisMutationElec: string | null
    fraisMutationGaz: string | null
    fraisPassageMonoTri: string | null
    autresFrais: string | null
    reglementClient: string | null
    resteAPayer: string | null
    subventionDemandee: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjetCountAggregateOutputType = {
    id: number
    codeBarres: number
    reference: number
    abonnes: number
    email: number
    cin: number
    contact: number
    coordonneesGps: number
    adresseLieuImplantation: number
    presenteParMF: number
    district: number
    gouvernorat: number
    delegation: number
    municipalite: number
    typeProjet: number
    etatDossier: number
    classementDossier: number
    commentaire: number
    approbationCommerciale: number
    approbationTechnique: number
    executionInstallation: number
    reception: number
    procesVerbal: number
    contratAchat: number
    montantFinancement: number
    tauxInteret: number
    banque: number
    agentCommercialId: number
    agentCommercialAutre: number
    puissanceInstallee: number
    typeCompteur: number
    numeroCompteur: number
    calibreDisjoncteur: number
    puissanceSouscrite: number
    productionPrevisionnelle: number
    consommationAnnuelle: number
    nbModules: number
    puUnitairePV: number
    marquePV: number
    modelePV: number
    nbOnduleurs: number
    puUnitaireOnd: number
    puOndSiAutreW: number
    marqueOnd: number
    modeleOnd: number
    autreModeleOnd: number
    equipementSurMesure: number
    interventionSurMesure: number
    rapportPuissance: number
    dateDepotDossier: number
    dateApprobation: number
    dateInstallation: number
    dateDepotDemandeMES: number
    datePaiementPoseCompteurProsol: number
    dateMES: number
    nPolice: number
    nLotDebProsol: number
    saisieProsol: number
    nLotDeblocageSubvention: number
    deblocageProsol: number
    conditionSubvention: number
    saisieSubvention: number
    deblocageSubvention: number
    nDevis: number
    dateDevis: number
    nFacture: number
    dateFacture: number
    montantHT: number
    tva: number
    montantTTC: number
    montantTTCFinal: number
    montantAutofinancement: number
    fraisPoseCmptProsol: number
    paiement1erFactureSTEG: number
    paiement2emeFactureSTEG: number
    fraisAugmentationCalibre: number
    fraisMutationElec: number
    fraisMutationGaz: number
    fraisPassageMonoTri: number
    autresFrais: number
    reglementClient: number
    resteAPayer: number
    subventionDemandee: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProjetAvgAggregateInputType = {
    nbModules?: true
    nbOnduleurs?: true
  }

  export type ProjetSumAggregateInputType = {
    nbModules?: true
    nbOnduleurs?: true
  }

  export type ProjetMinAggregateInputType = {
    id?: true
    codeBarres?: true
    reference?: true
    abonnes?: true
    email?: true
    cin?: true
    contact?: true
    coordonneesGps?: true
    adresseLieuImplantation?: true
    presenteParMF?: true
    district?: true
    gouvernorat?: true
    delegation?: true
    municipalite?: true
    typeProjet?: true
    etatDossier?: true
    classementDossier?: true
    commentaire?: true
    approbationCommerciale?: true
    approbationTechnique?: true
    executionInstallation?: true
    reception?: true
    procesVerbal?: true
    contratAchat?: true
    montantFinancement?: true
    tauxInteret?: true
    banque?: true
    agentCommercialId?: true
    agentCommercialAutre?: true
    puissanceInstallee?: true
    typeCompteur?: true
    numeroCompteur?: true
    calibreDisjoncteur?: true
    puissanceSouscrite?: true
    productionPrevisionnelle?: true
    consommationAnnuelle?: true
    nbModules?: true
    puUnitairePV?: true
    marquePV?: true
    modelePV?: true
    nbOnduleurs?: true
    puUnitaireOnd?: true
    puOndSiAutreW?: true
    marqueOnd?: true
    modeleOnd?: true
    autreModeleOnd?: true
    equipementSurMesure?: true
    interventionSurMesure?: true
    rapportPuissance?: true
    dateDepotDossier?: true
    dateApprobation?: true
    dateInstallation?: true
    dateDepotDemandeMES?: true
    datePaiementPoseCompteurProsol?: true
    dateMES?: true
    nPolice?: true
    nLotDebProsol?: true
    saisieProsol?: true
    nLotDeblocageSubvention?: true
    deblocageProsol?: true
    conditionSubvention?: true
    saisieSubvention?: true
    deblocageSubvention?: true
    nDevis?: true
    dateDevis?: true
    nFacture?: true
    dateFacture?: true
    montantHT?: true
    tva?: true
    montantTTC?: true
    montantTTCFinal?: true
    montantAutofinancement?: true
    fraisPoseCmptProsol?: true
    paiement1erFactureSTEG?: true
    paiement2emeFactureSTEG?: true
    fraisAugmentationCalibre?: true
    fraisMutationElec?: true
    fraisMutationGaz?: true
    fraisPassageMonoTri?: true
    autresFrais?: true
    reglementClient?: true
    resteAPayer?: true
    subventionDemandee?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjetMaxAggregateInputType = {
    id?: true
    codeBarres?: true
    reference?: true
    abonnes?: true
    email?: true
    cin?: true
    contact?: true
    coordonneesGps?: true
    adresseLieuImplantation?: true
    presenteParMF?: true
    district?: true
    gouvernorat?: true
    delegation?: true
    municipalite?: true
    typeProjet?: true
    etatDossier?: true
    classementDossier?: true
    commentaire?: true
    approbationCommerciale?: true
    approbationTechnique?: true
    executionInstallation?: true
    reception?: true
    procesVerbal?: true
    contratAchat?: true
    montantFinancement?: true
    tauxInteret?: true
    banque?: true
    agentCommercialId?: true
    agentCommercialAutre?: true
    puissanceInstallee?: true
    typeCompteur?: true
    numeroCompteur?: true
    calibreDisjoncteur?: true
    puissanceSouscrite?: true
    productionPrevisionnelle?: true
    consommationAnnuelle?: true
    nbModules?: true
    puUnitairePV?: true
    marquePV?: true
    modelePV?: true
    nbOnduleurs?: true
    puUnitaireOnd?: true
    puOndSiAutreW?: true
    marqueOnd?: true
    modeleOnd?: true
    autreModeleOnd?: true
    equipementSurMesure?: true
    interventionSurMesure?: true
    rapportPuissance?: true
    dateDepotDossier?: true
    dateApprobation?: true
    dateInstallation?: true
    dateDepotDemandeMES?: true
    datePaiementPoseCompteurProsol?: true
    dateMES?: true
    nPolice?: true
    nLotDebProsol?: true
    saisieProsol?: true
    nLotDeblocageSubvention?: true
    deblocageProsol?: true
    conditionSubvention?: true
    saisieSubvention?: true
    deblocageSubvention?: true
    nDevis?: true
    dateDevis?: true
    nFacture?: true
    dateFacture?: true
    montantHT?: true
    tva?: true
    montantTTC?: true
    montantTTCFinal?: true
    montantAutofinancement?: true
    fraisPoseCmptProsol?: true
    paiement1erFactureSTEG?: true
    paiement2emeFactureSTEG?: true
    fraisAugmentationCalibre?: true
    fraisMutationElec?: true
    fraisMutationGaz?: true
    fraisPassageMonoTri?: true
    autresFrais?: true
    reglementClient?: true
    resteAPayer?: true
    subventionDemandee?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjetCountAggregateInputType = {
    id?: true
    codeBarres?: true
    reference?: true
    abonnes?: true
    email?: true
    cin?: true
    contact?: true
    coordonneesGps?: true
    adresseLieuImplantation?: true
    presenteParMF?: true
    district?: true
    gouvernorat?: true
    delegation?: true
    municipalite?: true
    typeProjet?: true
    etatDossier?: true
    classementDossier?: true
    commentaire?: true
    approbationCommerciale?: true
    approbationTechnique?: true
    executionInstallation?: true
    reception?: true
    procesVerbal?: true
    contratAchat?: true
    montantFinancement?: true
    tauxInteret?: true
    banque?: true
    agentCommercialId?: true
    agentCommercialAutre?: true
    puissanceInstallee?: true
    typeCompteur?: true
    numeroCompteur?: true
    calibreDisjoncteur?: true
    puissanceSouscrite?: true
    productionPrevisionnelle?: true
    consommationAnnuelle?: true
    nbModules?: true
    puUnitairePV?: true
    marquePV?: true
    modelePV?: true
    nbOnduleurs?: true
    puUnitaireOnd?: true
    puOndSiAutreW?: true
    marqueOnd?: true
    modeleOnd?: true
    autreModeleOnd?: true
    equipementSurMesure?: true
    interventionSurMesure?: true
    rapportPuissance?: true
    dateDepotDossier?: true
    dateApprobation?: true
    dateInstallation?: true
    dateDepotDemandeMES?: true
    datePaiementPoseCompteurProsol?: true
    dateMES?: true
    nPolice?: true
    nLotDebProsol?: true
    saisieProsol?: true
    nLotDeblocageSubvention?: true
    deblocageProsol?: true
    conditionSubvention?: true
    saisieSubvention?: true
    deblocageSubvention?: true
    nDevis?: true
    dateDevis?: true
    nFacture?: true
    dateFacture?: true
    montantHT?: true
    tva?: true
    montantTTC?: true
    montantTTCFinal?: true
    montantAutofinancement?: true
    fraisPoseCmptProsol?: true
    paiement1erFactureSTEG?: true
    paiement2emeFactureSTEG?: true
    fraisAugmentationCalibre?: true
    fraisMutationElec?: true
    fraisMutationGaz?: true
    fraisPassageMonoTri?: true
    autresFrais?: true
    reglementClient?: true
    resteAPayer?: true
    subventionDemandee?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProjetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projet to aggregate.
     */
    where?: ProjetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projets to fetch.
     */
    orderBy?: ProjetOrderByWithRelationInput | ProjetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projets
    **/
    _count?: true | ProjetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjetAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjetSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjetMaxAggregateInputType
  }

  export type GetProjetAggregateType<T extends ProjetAggregateArgs> = {
        [P in keyof T & keyof AggregateProjet]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjet[P]>
      : GetScalarType<T[P], AggregateProjet[P]>
  }




  export type ProjetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjetWhereInput
    orderBy?: ProjetOrderByWithAggregationInput | ProjetOrderByWithAggregationInput[]
    by: ProjetScalarFieldEnum[] | ProjetScalarFieldEnum
    having?: ProjetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjetCountAggregateInputType | true
    _avg?: ProjetAvgAggregateInputType
    _sum?: ProjetSumAggregateInputType
    _min?: ProjetMinAggregateInputType
    _max?: ProjetMaxAggregateInputType
  }

  export type ProjetGroupByOutputType = {
    id: string
    codeBarres: string | null
    reference: string
    abonnes: string
    email: string | null
    cin: string | null
    contact: string | null
    coordonneesGps: string | null
    adresseLieuImplantation: string | null
    presenteParMF: string | null
    district: string | null
    gouvernorat: string | null
    delegation: string | null
    municipalite: string | null
    typeProjet: $Enums.TypeProjet
    etatDossier: $Enums.EtatDossier
    classementDossier: $Enums.ClassementDossier
    commentaire: string | null
    approbationCommerciale: $Enums.StatutApprobation
    approbationTechnique: $Enums.StatutApprobation
    executionInstallation: string | null
    reception: string | null
    procesVerbal: string | null
    contratAchat: $Enums.TypeContrat | null
    montantFinancement: string | null
    tauxInteret: string | null
    banque: string | null
    agentCommercialId: string | null
    agentCommercialAutre: string | null
    puissanceInstallee: string | null
    typeCompteur: $Enums.TypeCompteur | null
    numeroCompteur: string | null
    calibreDisjoncteur: string | null
    puissanceSouscrite: string | null
    productionPrevisionnelle: string | null
    consommationAnnuelle: string | null
    nbModules: number | null
    puUnitairePV: string | null
    marquePV: string | null
    modelePV: string | null
    nbOnduleurs: number | null
    puUnitaireOnd: string | null
    puOndSiAutreW: string | null
    marqueOnd: string | null
    modeleOnd: string | null
    autreModeleOnd: string | null
    equipementSurMesure: string | null
    interventionSurMesure: string | null
    rapportPuissance: string | null
    dateDepotDossier: Date | null
    dateApprobation: Date | null
    dateInstallation: Date | null
    dateDepotDemandeMES: Date | null
    datePaiementPoseCompteurProsol: Date | null
    dateMES: Date | null
    nPolice: string | null
    nLotDebProsol: string | null
    saisieProsol: string | null
    nLotDeblocageSubvention: string | null
    deblocageProsol: string | null
    conditionSubvention: string | null
    saisieSubvention: string | null
    deblocageSubvention: string | null
    nDevis: string | null
    dateDevis: Date | null
    nFacture: string | null
    dateFacture: Date | null
    montantHT: string | null
    tva: string | null
    montantTTC: string | null
    montantTTCFinal: string | null
    montantAutofinancement: string | null
    fraisPoseCmptProsol: string | null
    paiement1erFactureSTEG: string | null
    paiement2emeFactureSTEG: string | null
    fraisAugmentationCalibre: string | null
    fraisMutationElec: string | null
    fraisMutationGaz: string | null
    fraisPassageMonoTri: string | null
    autresFrais: string | null
    reglementClient: string | null
    resteAPayer: string | null
    subventionDemandee: string | null
    createdAt: Date
    updatedAt: Date
    _count: ProjetCountAggregateOutputType | null
    _avg: ProjetAvgAggregateOutputType | null
    _sum: ProjetSumAggregateOutputType | null
    _min: ProjetMinAggregateOutputType | null
    _max: ProjetMaxAggregateOutputType | null
  }

  type GetProjetGroupByPayload<T extends ProjetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjetGroupByOutputType[P]>
            : GetScalarType<T[P], ProjetGroupByOutputType[P]>
        }
      >
    >


  export type ProjetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    codeBarres?: boolean
    reference?: boolean
    abonnes?: boolean
    email?: boolean
    cin?: boolean
    contact?: boolean
    coordonneesGps?: boolean
    adresseLieuImplantation?: boolean
    presenteParMF?: boolean
    district?: boolean
    gouvernorat?: boolean
    delegation?: boolean
    municipalite?: boolean
    typeProjet?: boolean
    etatDossier?: boolean
    classementDossier?: boolean
    commentaire?: boolean
    approbationCommerciale?: boolean
    approbationTechnique?: boolean
    executionInstallation?: boolean
    reception?: boolean
    procesVerbal?: boolean
    contratAchat?: boolean
    montantFinancement?: boolean
    tauxInteret?: boolean
    banque?: boolean
    agentCommercialId?: boolean
    agentCommercialAutre?: boolean
    puissanceInstallee?: boolean
    typeCompteur?: boolean
    numeroCompteur?: boolean
    calibreDisjoncteur?: boolean
    puissanceSouscrite?: boolean
    productionPrevisionnelle?: boolean
    consommationAnnuelle?: boolean
    nbModules?: boolean
    puUnitairePV?: boolean
    marquePV?: boolean
    modelePV?: boolean
    nbOnduleurs?: boolean
    puUnitaireOnd?: boolean
    puOndSiAutreW?: boolean
    marqueOnd?: boolean
    modeleOnd?: boolean
    autreModeleOnd?: boolean
    equipementSurMesure?: boolean
    interventionSurMesure?: boolean
    rapportPuissance?: boolean
    dateDepotDossier?: boolean
    dateApprobation?: boolean
    dateInstallation?: boolean
    dateDepotDemandeMES?: boolean
    datePaiementPoseCompteurProsol?: boolean
    dateMES?: boolean
    nPolice?: boolean
    nLotDebProsol?: boolean
    saisieProsol?: boolean
    nLotDeblocageSubvention?: boolean
    deblocageProsol?: boolean
    conditionSubvention?: boolean
    saisieSubvention?: boolean
    deblocageSubvention?: boolean
    nDevis?: boolean
    dateDevis?: boolean
    nFacture?: boolean
    dateFacture?: boolean
    montantHT?: boolean
    tva?: boolean
    montantTTC?: boolean
    montantTTCFinal?: boolean
    montantAutofinancement?: boolean
    fraisPoseCmptProsol?: boolean
    paiement1erFactureSTEG?: boolean
    paiement2emeFactureSTEG?: boolean
    fraisAugmentationCalibre?: boolean
    fraisMutationElec?: boolean
    fraisMutationGaz?: boolean
    fraisPassageMonoTri?: boolean
    autresFrais?: boolean
    reglementClient?: boolean
    resteAPayer?: boolean
    subventionDemandee?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    agentCommercial?: boolean | Projet$agentCommercialArgs<ExtArgs>
    echeances?: boolean | Projet$echeancesArgs<ExtArgs>
    logs?: boolean | Projet$logsArgs<ExtArgs>
    _count?: boolean | ProjetCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projet"]>



  export type ProjetSelectScalar = {
    id?: boolean
    codeBarres?: boolean
    reference?: boolean
    abonnes?: boolean
    email?: boolean
    cin?: boolean
    contact?: boolean
    coordonneesGps?: boolean
    adresseLieuImplantation?: boolean
    presenteParMF?: boolean
    district?: boolean
    gouvernorat?: boolean
    delegation?: boolean
    municipalite?: boolean
    typeProjet?: boolean
    etatDossier?: boolean
    classementDossier?: boolean
    commentaire?: boolean
    approbationCommerciale?: boolean
    approbationTechnique?: boolean
    executionInstallation?: boolean
    reception?: boolean
    procesVerbal?: boolean
    contratAchat?: boolean
    montantFinancement?: boolean
    tauxInteret?: boolean
    banque?: boolean
    agentCommercialId?: boolean
    agentCommercialAutre?: boolean
    puissanceInstallee?: boolean
    typeCompteur?: boolean
    numeroCompteur?: boolean
    calibreDisjoncteur?: boolean
    puissanceSouscrite?: boolean
    productionPrevisionnelle?: boolean
    consommationAnnuelle?: boolean
    nbModules?: boolean
    puUnitairePV?: boolean
    marquePV?: boolean
    modelePV?: boolean
    nbOnduleurs?: boolean
    puUnitaireOnd?: boolean
    puOndSiAutreW?: boolean
    marqueOnd?: boolean
    modeleOnd?: boolean
    autreModeleOnd?: boolean
    equipementSurMesure?: boolean
    interventionSurMesure?: boolean
    rapportPuissance?: boolean
    dateDepotDossier?: boolean
    dateApprobation?: boolean
    dateInstallation?: boolean
    dateDepotDemandeMES?: boolean
    datePaiementPoseCompteurProsol?: boolean
    dateMES?: boolean
    nPolice?: boolean
    nLotDebProsol?: boolean
    saisieProsol?: boolean
    nLotDeblocageSubvention?: boolean
    deblocageProsol?: boolean
    conditionSubvention?: boolean
    saisieSubvention?: boolean
    deblocageSubvention?: boolean
    nDevis?: boolean
    dateDevis?: boolean
    nFacture?: boolean
    dateFacture?: boolean
    montantHT?: boolean
    tva?: boolean
    montantTTC?: boolean
    montantTTCFinal?: boolean
    montantAutofinancement?: boolean
    fraisPoseCmptProsol?: boolean
    paiement1erFactureSTEG?: boolean
    paiement2emeFactureSTEG?: boolean
    fraisAugmentationCalibre?: boolean
    fraisMutationElec?: boolean
    fraisMutationGaz?: boolean
    fraisPassageMonoTri?: boolean
    autresFrais?: boolean
    reglementClient?: boolean
    resteAPayer?: boolean
    subventionDemandee?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProjetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "codeBarres" | "reference" | "abonnes" | "email" | "cin" | "contact" | "coordonneesGps" | "adresseLieuImplantation" | "presenteParMF" | "district" | "gouvernorat" | "delegation" | "municipalite" | "typeProjet" | "etatDossier" | "classementDossier" | "commentaire" | "approbationCommerciale" | "approbationTechnique" | "executionInstallation" | "reception" | "procesVerbal" | "contratAchat" | "montantFinancement" | "tauxInteret" | "banque" | "agentCommercialId" | "agentCommercialAutre" | "puissanceInstallee" | "typeCompteur" | "numeroCompteur" | "calibreDisjoncteur" | "puissanceSouscrite" | "productionPrevisionnelle" | "consommationAnnuelle" | "nbModules" | "puUnitairePV" | "marquePV" | "modelePV" | "nbOnduleurs" | "puUnitaireOnd" | "puOndSiAutreW" | "marqueOnd" | "modeleOnd" | "autreModeleOnd" | "equipementSurMesure" | "interventionSurMesure" | "rapportPuissance" | "dateDepotDossier" | "dateApprobation" | "dateInstallation" | "dateDepotDemandeMES" | "datePaiementPoseCompteurProsol" | "dateMES" | "nPolice" | "nLotDebProsol" | "saisieProsol" | "nLotDeblocageSubvention" | "deblocageProsol" | "conditionSubvention" | "saisieSubvention" | "deblocageSubvention" | "nDevis" | "dateDevis" | "nFacture" | "dateFacture" | "montantHT" | "tva" | "montantTTC" | "montantTTCFinal" | "montantAutofinancement" | "fraisPoseCmptProsol" | "paiement1erFactureSTEG" | "paiement2emeFactureSTEG" | "fraisAugmentationCalibre" | "fraisMutationElec" | "fraisMutationGaz" | "fraisPassageMonoTri" | "autresFrais" | "reglementClient" | "resteAPayer" | "subventionDemandee" | "createdAt" | "updatedAt", ExtArgs["result"]["projet"]>
  export type ProjetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agentCommercial?: boolean | Projet$agentCommercialArgs<ExtArgs>
    echeances?: boolean | Projet$echeancesArgs<ExtArgs>
    logs?: boolean | Projet$logsArgs<ExtArgs>
    _count?: boolean | ProjetCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ProjetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Projet"
    objects: {
      agentCommercial: Prisma.$UserPayload<ExtArgs> | null
      echeances: Prisma.$EcheancePayload<ExtArgs>[]
      logs: Prisma.$ActionLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      codeBarres: string | null
      reference: string
      abonnes: string
      email: string | null
      cin: string | null
      contact: string | null
      coordonneesGps: string | null
      adresseLieuImplantation: string | null
      presenteParMF: string | null
      district: string | null
      gouvernorat: string | null
      delegation: string | null
      municipalite: string | null
      typeProjet: $Enums.TypeProjet
      etatDossier: $Enums.EtatDossier
      classementDossier: $Enums.ClassementDossier
      commentaire: string | null
      approbationCommerciale: $Enums.StatutApprobation
      approbationTechnique: $Enums.StatutApprobation
      executionInstallation: string | null
      reception: string | null
      procesVerbal: string | null
      contratAchat: $Enums.TypeContrat | null
      montantFinancement: string | null
      tauxInteret: string | null
      banque: string | null
      agentCommercialId: string | null
      agentCommercialAutre: string | null
      puissanceInstallee: string | null
      typeCompteur: $Enums.TypeCompteur | null
      numeroCompteur: string | null
      calibreDisjoncteur: string | null
      puissanceSouscrite: string | null
      productionPrevisionnelle: string | null
      consommationAnnuelle: string | null
      nbModules: number | null
      puUnitairePV: string | null
      marquePV: string | null
      modelePV: string | null
      nbOnduleurs: number | null
      puUnitaireOnd: string | null
      puOndSiAutreW: string | null
      marqueOnd: string | null
      modeleOnd: string | null
      autreModeleOnd: string | null
      equipementSurMesure: string | null
      interventionSurMesure: string | null
      rapportPuissance: string | null
      dateDepotDossier: Date | null
      dateApprobation: Date | null
      dateInstallation: Date | null
      dateDepotDemandeMES: Date | null
      datePaiementPoseCompteurProsol: Date | null
      dateMES: Date | null
      nPolice: string | null
      nLotDebProsol: string | null
      saisieProsol: string | null
      nLotDeblocageSubvention: string | null
      deblocageProsol: string | null
      conditionSubvention: string | null
      saisieSubvention: string | null
      deblocageSubvention: string | null
      nDevis: string | null
      dateDevis: Date | null
      nFacture: string | null
      dateFacture: Date | null
      montantHT: string | null
      tva: string | null
      montantTTC: string | null
      montantTTCFinal: string | null
      montantAutofinancement: string | null
      fraisPoseCmptProsol: string | null
      paiement1erFactureSTEG: string | null
      paiement2emeFactureSTEG: string | null
      fraisAugmentationCalibre: string | null
      fraisMutationElec: string | null
      fraisMutationGaz: string | null
      fraisPassageMonoTri: string | null
      autresFrais: string | null
      reglementClient: string | null
      resteAPayer: string | null
      subventionDemandee: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["projet"]>
    composites: {}
  }

  type ProjetGetPayload<S extends boolean | null | undefined | ProjetDefaultArgs> = $Result.GetResult<Prisma.$ProjetPayload, S>

  type ProjetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjetCountAggregateInputType | true
    }

  export interface ProjetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Projet'], meta: { name: 'Projet' } }
    /**
     * Find zero or one Projet that matches the filter.
     * @param {ProjetFindUniqueArgs} args - Arguments to find a Projet
     * @example
     * // Get one Projet
     * const projet = await prisma.projet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjetFindUniqueArgs>(args: SelectSubset<T, ProjetFindUniqueArgs<ExtArgs>>): Prisma__ProjetClient<$Result.GetResult<Prisma.$ProjetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Projet that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjetFindUniqueOrThrowArgs} args - Arguments to find a Projet
     * @example
     * // Get one Projet
     * const projet = await prisma.projet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjetFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjetClient<$Result.GetResult<Prisma.$ProjetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Projet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjetFindFirstArgs} args - Arguments to find a Projet
     * @example
     * // Get one Projet
     * const projet = await prisma.projet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjetFindFirstArgs>(args?: SelectSubset<T, ProjetFindFirstArgs<ExtArgs>>): Prisma__ProjetClient<$Result.GetResult<Prisma.$ProjetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Projet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjetFindFirstOrThrowArgs} args - Arguments to find a Projet
     * @example
     * // Get one Projet
     * const projet = await prisma.projet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjetFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjetFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjetClient<$Result.GetResult<Prisma.$ProjetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projets
     * const projets = await prisma.projet.findMany()
     * 
     * // Get first 10 Projets
     * const projets = await prisma.projet.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projetWithIdOnly = await prisma.projet.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjetFindManyArgs>(args?: SelectSubset<T, ProjetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Projet.
     * @param {ProjetCreateArgs} args - Arguments to create a Projet.
     * @example
     * // Create one Projet
     * const Projet = await prisma.projet.create({
     *   data: {
     *     // ... data to create a Projet
     *   }
     * })
     * 
     */
    create<T extends ProjetCreateArgs>(args: SelectSubset<T, ProjetCreateArgs<ExtArgs>>): Prisma__ProjetClient<$Result.GetResult<Prisma.$ProjetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projets.
     * @param {ProjetCreateManyArgs} args - Arguments to create many Projets.
     * @example
     * // Create many Projets
     * const projet = await prisma.projet.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjetCreateManyArgs>(args?: SelectSubset<T, ProjetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Projet.
     * @param {ProjetDeleteArgs} args - Arguments to delete one Projet.
     * @example
     * // Delete one Projet
     * const Projet = await prisma.projet.delete({
     *   where: {
     *     // ... filter to delete one Projet
     *   }
     * })
     * 
     */
    delete<T extends ProjetDeleteArgs>(args: SelectSubset<T, ProjetDeleteArgs<ExtArgs>>): Prisma__ProjetClient<$Result.GetResult<Prisma.$ProjetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Projet.
     * @param {ProjetUpdateArgs} args - Arguments to update one Projet.
     * @example
     * // Update one Projet
     * const projet = await prisma.projet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjetUpdateArgs>(args: SelectSubset<T, ProjetUpdateArgs<ExtArgs>>): Prisma__ProjetClient<$Result.GetResult<Prisma.$ProjetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projets.
     * @param {ProjetDeleteManyArgs} args - Arguments to filter Projets to delete.
     * @example
     * // Delete a few Projets
     * const { count } = await prisma.projet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjetDeleteManyArgs>(args?: SelectSubset<T, ProjetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projets
     * const projet = await prisma.projet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjetUpdateManyArgs>(args: SelectSubset<T, ProjetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Projet.
     * @param {ProjetUpsertArgs} args - Arguments to update or create a Projet.
     * @example
     * // Update or create a Projet
     * const projet = await prisma.projet.upsert({
     *   create: {
     *     // ... data to create a Projet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Projet we want to update
     *   }
     * })
     */
    upsert<T extends ProjetUpsertArgs>(args: SelectSubset<T, ProjetUpsertArgs<ExtArgs>>): Prisma__ProjetClient<$Result.GetResult<Prisma.$ProjetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projets that matches the filter.
     * @param {ProjetFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const projet = await prisma.projet.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: ProjetFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Projet.
     * @param {ProjetAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const projet = await prisma.projet.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: ProjetAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Projets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjetCountArgs} args - Arguments to filter Projets to count.
     * @example
     * // Count the number of Projets
     * const count = await prisma.projet.count({
     *   where: {
     *     // ... the filter for the Projets we want to count
     *   }
     * })
    **/
    count<T extends ProjetCountArgs>(
      args?: Subset<T, ProjetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Projet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjetAggregateArgs>(args: Subset<T, ProjetAggregateArgs>): Prisma.PrismaPromise<GetProjetAggregateType<T>>

    /**
     * Group by Projet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjetGroupByArgs['orderBy'] }
        : { orderBy?: ProjetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Projet model
   */
  readonly fields: ProjetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Projet.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agentCommercial<T extends Projet$agentCommercialArgs<ExtArgs> = {}>(args?: Subset<T, Projet$agentCommercialArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    echeances<T extends Projet$echeancesArgs<ExtArgs> = {}>(args?: Subset<T, Projet$echeancesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EcheancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    logs<T extends Projet$logsArgs<ExtArgs> = {}>(args?: Subset<T, Projet$logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActionLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Projet model
   */
  interface ProjetFieldRefs {
    readonly id: FieldRef<"Projet", 'String'>
    readonly codeBarres: FieldRef<"Projet", 'String'>
    readonly reference: FieldRef<"Projet", 'String'>
    readonly abonnes: FieldRef<"Projet", 'String'>
    readonly email: FieldRef<"Projet", 'String'>
    readonly cin: FieldRef<"Projet", 'String'>
    readonly contact: FieldRef<"Projet", 'String'>
    readonly coordonneesGps: FieldRef<"Projet", 'String'>
    readonly adresseLieuImplantation: FieldRef<"Projet", 'String'>
    readonly presenteParMF: FieldRef<"Projet", 'String'>
    readonly district: FieldRef<"Projet", 'String'>
    readonly gouvernorat: FieldRef<"Projet", 'String'>
    readonly delegation: FieldRef<"Projet", 'String'>
    readonly municipalite: FieldRef<"Projet", 'String'>
    readonly typeProjet: FieldRef<"Projet", 'TypeProjet'>
    readonly etatDossier: FieldRef<"Projet", 'EtatDossier'>
    readonly classementDossier: FieldRef<"Projet", 'ClassementDossier'>
    readonly commentaire: FieldRef<"Projet", 'String'>
    readonly approbationCommerciale: FieldRef<"Projet", 'StatutApprobation'>
    readonly approbationTechnique: FieldRef<"Projet", 'StatutApprobation'>
    readonly executionInstallation: FieldRef<"Projet", 'String'>
    readonly reception: FieldRef<"Projet", 'String'>
    readonly procesVerbal: FieldRef<"Projet", 'String'>
    readonly contratAchat: FieldRef<"Projet", 'TypeContrat'>
    readonly montantFinancement: FieldRef<"Projet", 'String'>
    readonly tauxInteret: FieldRef<"Projet", 'String'>
    readonly banque: FieldRef<"Projet", 'String'>
    readonly agentCommercialId: FieldRef<"Projet", 'String'>
    readonly agentCommercialAutre: FieldRef<"Projet", 'String'>
    readonly puissanceInstallee: FieldRef<"Projet", 'String'>
    readonly typeCompteur: FieldRef<"Projet", 'TypeCompteur'>
    readonly numeroCompteur: FieldRef<"Projet", 'String'>
    readonly calibreDisjoncteur: FieldRef<"Projet", 'String'>
    readonly puissanceSouscrite: FieldRef<"Projet", 'String'>
    readonly productionPrevisionnelle: FieldRef<"Projet", 'String'>
    readonly consommationAnnuelle: FieldRef<"Projet", 'String'>
    readonly nbModules: FieldRef<"Projet", 'Int'>
    readonly puUnitairePV: FieldRef<"Projet", 'String'>
    readonly marquePV: FieldRef<"Projet", 'String'>
    readonly modelePV: FieldRef<"Projet", 'String'>
    readonly nbOnduleurs: FieldRef<"Projet", 'Int'>
    readonly puUnitaireOnd: FieldRef<"Projet", 'String'>
    readonly puOndSiAutreW: FieldRef<"Projet", 'String'>
    readonly marqueOnd: FieldRef<"Projet", 'String'>
    readonly modeleOnd: FieldRef<"Projet", 'String'>
    readonly autreModeleOnd: FieldRef<"Projet", 'String'>
    readonly equipementSurMesure: FieldRef<"Projet", 'String'>
    readonly interventionSurMesure: FieldRef<"Projet", 'String'>
    readonly rapportPuissance: FieldRef<"Projet", 'String'>
    readonly dateDepotDossier: FieldRef<"Projet", 'DateTime'>
    readonly dateApprobation: FieldRef<"Projet", 'DateTime'>
    readonly dateInstallation: FieldRef<"Projet", 'DateTime'>
    readonly dateDepotDemandeMES: FieldRef<"Projet", 'DateTime'>
    readonly datePaiementPoseCompteurProsol: FieldRef<"Projet", 'DateTime'>
    readonly dateMES: FieldRef<"Projet", 'DateTime'>
    readonly nPolice: FieldRef<"Projet", 'String'>
    readonly nLotDebProsol: FieldRef<"Projet", 'String'>
    readonly saisieProsol: FieldRef<"Projet", 'String'>
    readonly nLotDeblocageSubvention: FieldRef<"Projet", 'String'>
    readonly deblocageProsol: FieldRef<"Projet", 'String'>
    readonly conditionSubvention: FieldRef<"Projet", 'String'>
    readonly saisieSubvention: FieldRef<"Projet", 'String'>
    readonly deblocageSubvention: FieldRef<"Projet", 'String'>
    readonly nDevis: FieldRef<"Projet", 'String'>
    readonly dateDevis: FieldRef<"Projet", 'DateTime'>
    readonly nFacture: FieldRef<"Projet", 'String'>
    readonly dateFacture: FieldRef<"Projet", 'DateTime'>
    readonly montantHT: FieldRef<"Projet", 'String'>
    readonly tva: FieldRef<"Projet", 'String'>
    readonly montantTTC: FieldRef<"Projet", 'String'>
    readonly montantTTCFinal: FieldRef<"Projet", 'String'>
    readonly montantAutofinancement: FieldRef<"Projet", 'String'>
    readonly fraisPoseCmptProsol: FieldRef<"Projet", 'String'>
    readonly paiement1erFactureSTEG: FieldRef<"Projet", 'String'>
    readonly paiement2emeFactureSTEG: FieldRef<"Projet", 'String'>
    readonly fraisAugmentationCalibre: FieldRef<"Projet", 'String'>
    readonly fraisMutationElec: FieldRef<"Projet", 'String'>
    readonly fraisMutationGaz: FieldRef<"Projet", 'String'>
    readonly fraisPassageMonoTri: FieldRef<"Projet", 'String'>
    readonly autresFrais: FieldRef<"Projet", 'String'>
    readonly reglementClient: FieldRef<"Projet", 'String'>
    readonly resteAPayer: FieldRef<"Projet", 'String'>
    readonly subventionDemandee: FieldRef<"Projet", 'String'>
    readonly createdAt: FieldRef<"Projet", 'DateTime'>
    readonly updatedAt: FieldRef<"Projet", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Projet findUnique
   */
  export type ProjetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Projet
     */
    select?: ProjetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Projet
     */
    omit?: ProjetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjetInclude<ExtArgs> | null
    /**
     * Filter, which Projet to fetch.
     */
    where: ProjetWhereUniqueInput
  }

  /**
   * Projet findUniqueOrThrow
   */
  export type ProjetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Projet
     */
    select?: ProjetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Projet
     */
    omit?: ProjetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjetInclude<ExtArgs> | null
    /**
     * Filter, which Projet to fetch.
     */
    where: ProjetWhereUniqueInput
  }

  /**
   * Projet findFirst
   */
  export type ProjetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Projet
     */
    select?: ProjetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Projet
     */
    omit?: ProjetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjetInclude<ExtArgs> | null
    /**
     * Filter, which Projet to fetch.
     */
    where?: ProjetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projets to fetch.
     */
    orderBy?: ProjetOrderByWithRelationInput | ProjetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projets.
     */
    cursor?: ProjetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projets.
     */
    distinct?: ProjetScalarFieldEnum | ProjetScalarFieldEnum[]
  }

  /**
   * Projet findFirstOrThrow
   */
  export type ProjetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Projet
     */
    select?: ProjetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Projet
     */
    omit?: ProjetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjetInclude<ExtArgs> | null
    /**
     * Filter, which Projet to fetch.
     */
    where?: ProjetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projets to fetch.
     */
    orderBy?: ProjetOrderByWithRelationInput | ProjetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projets.
     */
    cursor?: ProjetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projets.
     */
    distinct?: ProjetScalarFieldEnum | ProjetScalarFieldEnum[]
  }

  /**
   * Projet findMany
   */
  export type ProjetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Projet
     */
    select?: ProjetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Projet
     */
    omit?: ProjetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjetInclude<ExtArgs> | null
    /**
     * Filter, which Projets to fetch.
     */
    where?: ProjetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projets to fetch.
     */
    orderBy?: ProjetOrderByWithRelationInput | ProjetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projets.
     */
    cursor?: ProjetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projets.
     */
    skip?: number
    distinct?: ProjetScalarFieldEnum | ProjetScalarFieldEnum[]
  }

  /**
   * Projet create
   */
  export type ProjetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Projet
     */
    select?: ProjetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Projet
     */
    omit?: ProjetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjetInclude<ExtArgs> | null
    /**
     * The data needed to create a Projet.
     */
    data: XOR<ProjetCreateInput, ProjetUncheckedCreateInput>
  }

  /**
   * Projet createMany
   */
  export type ProjetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projets.
     */
    data: ProjetCreateManyInput | ProjetCreateManyInput[]
  }

  /**
   * Projet update
   */
  export type ProjetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Projet
     */
    select?: ProjetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Projet
     */
    omit?: ProjetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjetInclude<ExtArgs> | null
    /**
     * The data needed to update a Projet.
     */
    data: XOR<ProjetUpdateInput, ProjetUncheckedUpdateInput>
    /**
     * Choose, which Projet to update.
     */
    where: ProjetWhereUniqueInput
  }

  /**
   * Projet updateMany
   */
  export type ProjetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projets.
     */
    data: XOR<ProjetUpdateManyMutationInput, ProjetUncheckedUpdateManyInput>
    /**
     * Filter which Projets to update
     */
    where?: ProjetWhereInput
    /**
     * Limit how many Projets to update.
     */
    limit?: number
  }

  /**
   * Projet upsert
   */
  export type ProjetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Projet
     */
    select?: ProjetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Projet
     */
    omit?: ProjetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjetInclude<ExtArgs> | null
    /**
     * The filter to search for the Projet to update in case it exists.
     */
    where: ProjetWhereUniqueInput
    /**
     * In case the Projet found by the `where` argument doesn't exist, create a new Projet with this data.
     */
    create: XOR<ProjetCreateInput, ProjetUncheckedCreateInput>
    /**
     * In case the Projet was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjetUpdateInput, ProjetUncheckedUpdateInput>
  }

  /**
   * Projet delete
   */
  export type ProjetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Projet
     */
    select?: ProjetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Projet
     */
    omit?: ProjetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjetInclude<ExtArgs> | null
    /**
     * Filter which Projet to delete.
     */
    where: ProjetWhereUniqueInput
  }

  /**
   * Projet deleteMany
   */
  export type ProjetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projets to delete
     */
    where?: ProjetWhereInput
    /**
     * Limit how many Projets to delete.
     */
    limit?: number
  }

  /**
   * Projet findRaw
   */
  export type ProjetFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Projet aggregateRaw
   */
  export type ProjetAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Projet.agentCommercial
   */
  export type Projet$agentCommercialArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Projet.echeances
   */
  export type Projet$echeancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Echeance
     */
    select?: EcheanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Echeance
     */
    omit?: EcheanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EcheanceInclude<ExtArgs> | null
    where?: EcheanceWhereInput
    orderBy?: EcheanceOrderByWithRelationInput | EcheanceOrderByWithRelationInput[]
    cursor?: EcheanceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EcheanceScalarFieldEnum | EcheanceScalarFieldEnum[]
  }

  /**
   * Projet.logs
   */
  export type Projet$logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionLog
     */
    select?: ActionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionLog
     */
    omit?: ActionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionLogInclude<ExtArgs> | null
    where?: ActionLogWhereInput
    orderBy?: ActionLogOrderByWithRelationInput | ActionLogOrderByWithRelationInput[]
    cursor?: ActionLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActionLogScalarFieldEnum | ActionLogScalarFieldEnum[]
  }

  /**
   * Projet without action
   */
  export type ProjetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Projet
     */
    select?: ProjetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Projet
     */
    omit?: ProjetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjetInclude<ExtArgs> | null
  }


  /**
   * Model Echeance
   */

  export type AggregateEcheance = {
    _count: EcheanceCountAggregateOutputType | null
    _avg: EcheanceAvgAggregateOutputType | null
    _sum: EcheanceSumAggregateOutputType | null
    _min: EcheanceMinAggregateOutputType | null
    _max: EcheanceMaxAggregateOutputType | null
  }

  export type EcheanceAvgAggregateOutputType = {
    numero: number | null
  }

  export type EcheanceSumAggregateOutputType = {
    numero: number | null
  }

  export type EcheanceMinAggregateOutputType = {
    id: string | null
    projetId: string | null
    numero: number | null
    montant: string | null
    date: Date | null
    modePaiement: string | null
    description: string | null
  }

  export type EcheanceMaxAggregateOutputType = {
    id: string | null
    projetId: string | null
    numero: number | null
    montant: string | null
    date: Date | null
    modePaiement: string | null
    description: string | null
  }

  export type EcheanceCountAggregateOutputType = {
    id: number
    projetId: number
    numero: number
    montant: number
    date: number
    modePaiement: number
    description: number
    _all: number
  }


  export type EcheanceAvgAggregateInputType = {
    numero?: true
  }

  export type EcheanceSumAggregateInputType = {
    numero?: true
  }

  export type EcheanceMinAggregateInputType = {
    id?: true
    projetId?: true
    numero?: true
    montant?: true
    date?: true
    modePaiement?: true
    description?: true
  }

  export type EcheanceMaxAggregateInputType = {
    id?: true
    projetId?: true
    numero?: true
    montant?: true
    date?: true
    modePaiement?: true
    description?: true
  }

  export type EcheanceCountAggregateInputType = {
    id?: true
    projetId?: true
    numero?: true
    montant?: true
    date?: true
    modePaiement?: true
    description?: true
    _all?: true
  }

  export type EcheanceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Echeance to aggregate.
     */
    where?: EcheanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Echeances to fetch.
     */
    orderBy?: EcheanceOrderByWithRelationInput | EcheanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EcheanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Echeances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Echeances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Echeances
    **/
    _count?: true | EcheanceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EcheanceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EcheanceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EcheanceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EcheanceMaxAggregateInputType
  }

  export type GetEcheanceAggregateType<T extends EcheanceAggregateArgs> = {
        [P in keyof T & keyof AggregateEcheance]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEcheance[P]>
      : GetScalarType<T[P], AggregateEcheance[P]>
  }




  export type EcheanceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EcheanceWhereInput
    orderBy?: EcheanceOrderByWithAggregationInput | EcheanceOrderByWithAggregationInput[]
    by: EcheanceScalarFieldEnum[] | EcheanceScalarFieldEnum
    having?: EcheanceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EcheanceCountAggregateInputType | true
    _avg?: EcheanceAvgAggregateInputType
    _sum?: EcheanceSumAggregateInputType
    _min?: EcheanceMinAggregateInputType
    _max?: EcheanceMaxAggregateInputType
  }

  export type EcheanceGroupByOutputType = {
    id: string
    projetId: string
    numero: number
    montant: string | null
    date: Date | null
    modePaiement: string | null
    description: string | null
    _count: EcheanceCountAggregateOutputType | null
    _avg: EcheanceAvgAggregateOutputType | null
    _sum: EcheanceSumAggregateOutputType | null
    _min: EcheanceMinAggregateOutputType | null
    _max: EcheanceMaxAggregateOutputType | null
  }

  type GetEcheanceGroupByPayload<T extends EcheanceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EcheanceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EcheanceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EcheanceGroupByOutputType[P]>
            : GetScalarType<T[P], EcheanceGroupByOutputType[P]>
        }
      >
    >


  export type EcheanceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projetId?: boolean
    numero?: boolean
    montant?: boolean
    date?: boolean
    modePaiement?: boolean
    description?: boolean
    projet?: boolean | ProjetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["echeance"]>



  export type EcheanceSelectScalar = {
    id?: boolean
    projetId?: boolean
    numero?: boolean
    montant?: boolean
    date?: boolean
    modePaiement?: boolean
    description?: boolean
  }

  export type EcheanceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projetId" | "numero" | "montant" | "date" | "modePaiement" | "description", ExtArgs["result"]["echeance"]>
  export type EcheanceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projet?: boolean | ProjetDefaultArgs<ExtArgs>
  }

  export type $EcheancePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Echeance"
    objects: {
      projet: Prisma.$ProjetPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projetId: string
      numero: number
      montant: string | null
      date: Date | null
      modePaiement: string | null
      description: string | null
    }, ExtArgs["result"]["echeance"]>
    composites: {}
  }

  type EcheanceGetPayload<S extends boolean | null | undefined | EcheanceDefaultArgs> = $Result.GetResult<Prisma.$EcheancePayload, S>

  type EcheanceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EcheanceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EcheanceCountAggregateInputType | true
    }

  export interface EcheanceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Echeance'], meta: { name: 'Echeance' } }
    /**
     * Find zero or one Echeance that matches the filter.
     * @param {EcheanceFindUniqueArgs} args - Arguments to find a Echeance
     * @example
     * // Get one Echeance
     * const echeance = await prisma.echeance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EcheanceFindUniqueArgs>(args: SelectSubset<T, EcheanceFindUniqueArgs<ExtArgs>>): Prisma__EcheanceClient<$Result.GetResult<Prisma.$EcheancePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Echeance that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EcheanceFindUniqueOrThrowArgs} args - Arguments to find a Echeance
     * @example
     * // Get one Echeance
     * const echeance = await prisma.echeance.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EcheanceFindUniqueOrThrowArgs>(args: SelectSubset<T, EcheanceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EcheanceClient<$Result.GetResult<Prisma.$EcheancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Echeance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EcheanceFindFirstArgs} args - Arguments to find a Echeance
     * @example
     * // Get one Echeance
     * const echeance = await prisma.echeance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EcheanceFindFirstArgs>(args?: SelectSubset<T, EcheanceFindFirstArgs<ExtArgs>>): Prisma__EcheanceClient<$Result.GetResult<Prisma.$EcheancePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Echeance that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EcheanceFindFirstOrThrowArgs} args - Arguments to find a Echeance
     * @example
     * // Get one Echeance
     * const echeance = await prisma.echeance.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EcheanceFindFirstOrThrowArgs>(args?: SelectSubset<T, EcheanceFindFirstOrThrowArgs<ExtArgs>>): Prisma__EcheanceClient<$Result.GetResult<Prisma.$EcheancePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Echeances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EcheanceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Echeances
     * const echeances = await prisma.echeance.findMany()
     * 
     * // Get first 10 Echeances
     * const echeances = await prisma.echeance.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const echeanceWithIdOnly = await prisma.echeance.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EcheanceFindManyArgs>(args?: SelectSubset<T, EcheanceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EcheancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Echeance.
     * @param {EcheanceCreateArgs} args - Arguments to create a Echeance.
     * @example
     * // Create one Echeance
     * const Echeance = await prisma.echeance.create({
     *   data: {
     *     // ... data to create a Echeance
     *   }
     * })
     * 
     */
    create<T extends EcheanceCreateArgs>(args: SelectSubset<T, EcheanceCreateArgs<ExtArgs>>): Prisma__EcheanceClient<$Result.GetResult<Prisma.$EcheancePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Echeances.
     * @param {EcheanceCreateManyArgs} args - Arguments to create many Echeances.
     * @example
     * // Create many Echeances
     * const echeance = await prisma.echeance.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EcheanceCreateManyArgs>(args?: SelectSubset<T, EcheanceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Echeance.
     * @param {EcheanceDeleteArgs} args - Arguments to delete one Echeance.
     * @example
     * // Delete one Echeance
     * const Echeance = await prisma.echeance.delete({
     *   where: {
     *     // ... filter to delete one Echeance
     *   }
     * })
     * 
     */
    delete<T extends EcheanceDeleteArgs>(args: SelectSubset<T, EcheanceDeleteArgs<ExtArgs>>): Prisma__EcheanceClient<$Result.GetResult<Prisma.$EcheancePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Echeance.
     * @param {EcheanceUpdateArgs} args - Arguments to update one Echeance.
     * @example
     * // Update one Echeance
     * const echeance = await prisma.echeance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EcheanceUpdateArgs>(args: SelectSubset<T, EcheanceUpdateArgs<ExtArgs>>): Prisma__EcheanceClient<$Result.GetResult<Prisma.$EcheancePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Echeances.
     * @param {EcheanceDeleteManyArgs} args - Arguments to filter Echeances to delete.
     * @example
     * // Delete a few Echeances
     * const { count } = await prisma.echeance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EcheanceDeleteManyArgs>(args?: SelectSubset<T, EcheanceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Echeances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EcheanceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Echeances
     * const echeance = await prisma.echeance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EcheanceUpdateManyArgs>(args: SelectSubset<T, EcheanceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Echeance.
     * @param {EcheanceUpsertArgs} args - Arguments to update or create a Echeance.
     * @example
     * // Update or create a Echeance
     * const echeance = await prisma.echeance.upsert({
     *   create: {
     *     // ... data to create a Echeance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Echeance we want to update
     *   }
     * })
     */
    upsert<T extends EcheanceUpsertArgs>(args: SelectSubset<T, EcheanceUpsertArgs<ExtArgs>>): Prisma__EcheanceClient<$Result.GetResult<Prisma.$EcheancePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Echeances that matches the filter.
     * @param {EcheanceFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const echeance = await prisma.echeance.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: EcheanceFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Echeance.
     * @param {EcheanceAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const echeance = await prisma.echeance.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: EcheanceAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Echeances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EcheanceCountArgs} args - Arguments to filter Echeances to count.
     * @example
     * // Count the number of Echeances
     * const count = await prisma.echeance.count({
     *   where: {
     *     // ... the filter for the Echeances we want to count
     *   }
     * })
    **/
    count<T extends EcheanceCountArgs>(
      args?: Subset<T, EcheanceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EcheanceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Echeance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EcheanceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EcheanceAggregateArgs>(args: Subset<T, EcheanceAggregateArgs>): Prisma.PrismaPromise<GetEcheanceAggregateType<T>>

    /**
     * Group by Echeance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EcheanceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EcheanceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EcheanceGroupByArgs['orderBy'] }
        : { orderBy?: EcheanceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EcheanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEcheanceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Echeance model
   */
  readonly fields: EcheanceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Echeance.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EcheanceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    projet<T extends ProjetDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjetDefaultArgs<ExtArgs>>): Prisma__ProjetClient<$Result.GetResult<Prisma.$ProjetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Echeance model
   */
  interface EcheanceFieldRefs {
    readonly id: FieldRef<"Echeance", 'String'>
    readonly projetId: FieldRef<"Echeance", 'String'>
    readonly numero: FieldRef<"Echeance", 'Int'>
    readonly montant: FieldRef<"Echeance", 'String'>
    readonly date: FieldRef<"Echeance", 'DateTime'>
    readonly modePaiement: FieldRef<"Echeance", 'String'>
    readonly description: FieldRef<"Echeance", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Echeance findUnique
   */
  export type EcheanceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Echeance
     */
    select?: EcheanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Echeance
     */
    omit?: EcheanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EcheanceInclude<ExtArgs> | null
    /**
     * Filter, which Echeance to fetch.
     */
    where: EcheanceWhereUniqueInput
  }

  /**
   * Echeance findUniqueOrThrow
   */
  export type EcheanceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Echeance
     */
    select?: EcheanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Echeance
     */
    omit?: EcheanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EcheanceInclude<ExtArgs> | null
    /**
     * Filter, which Echeance to fetch.
     */
    where: EcheanceWhereUniqueInput
  }

  /**
   * Echeance findFirst
   */
  export type EcheanceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Echeance
     */
    select?: EcheanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Echeance
     */
    omit?: EcheanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EcheanceInclude<ExtArgs> | null
    /**
     * Filter, which Echeance to fetch.
     */
    where?: EcheanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Echeances to fetch.
     */
    orderBy?: EcheanceOrderByWithRelationInput | EcheanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Echeances.
     */
    cursor?: EcheanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Echeances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Echeances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Echeances.
     */
    distinct?: EcheanceScalarFieldEnum | EcheanceScalarFieldEnum[]
  }

  /**
   * Echeance findFirstOrThrow
   */
  export type EcheanceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Echeance
     */
    select?: EcheanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Echeance
     */
    omit?: EcheanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EcheanceInclude<ExtArgs> | null
    /**
     * Filter, which Echeance to fetch.
     */
    where?: EcheanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Echeances to fetch.
     */
    orderBy?: EcheanceOrderByWithRelationInput | EcheanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Echeances.
     */
    cursor?: EcheanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Echeances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Echeances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Echeances.
     */
    distinct?: EcheanceScalarFieldEnum | EcheanceScalarFieldEnum[]
  }

  /**
   * Echeance findMany
   */
  export type EcheanceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Echeance
     */
    select?: EcheanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Echeance
     */
    omit?: EcheanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EcheanceInclude<ExtArgs> | null
    /**
     * Filter, which Echeances to fetch.
     */
    where?: EcheanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Echeances to fetch.
     */
    orderBy?: EcheanceOrderByWithRelationInput | EcheanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Echeances.
     */
    cursor?: EcheanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Echeances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Echeances.
     */
    skip?: number
    distinct?: EcheanceScalarFieldEnum | EcheanceScalarFieldEnum[]
  }

  /**
   * Echeance create
   */
  export type EcheanceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Echeance
     */
    select?: EcheanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Echeance
     */
    omit?: EcheanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EcheanceInclude<ExtArgs> | null
    /**
     * The data needed to create a Echeance.
     */
    data: XOR<EcheanceCreateInput, EcheanceUncheckedCreateInput>
  }

  /**
   * Echeance createMany
   */
  export type EcheanceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Echeances.
     */
    data: EcheanceCreateManyInput | EcheanceCreateManyInput[]
  }

  /**
   * Echeance update
   */
  export type EcheanceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Echeance
     */
    select?: EcheanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Echeance
     */
    omit?: EcheanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EcheanceInclude<ExtArgs> | null
    /**
     * The data needed to update a Echeance.
     */
    data: XOR<EcheanceUpdateInput, EcheanceUncheckedUpdateInput>
    /**
     * Choose, which Echeance to update.
     */
    where: EcheanceWhereUniqueInput
  }

  /**
   * Echeance updateMany
   */
  export type EcheanceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Echeances.
     */
    data: XOR<EcheanceUpdateManyMutationInput, EcheanceUncheckedUpdateManyInput>
    /**
     * Filter which Echeances to update
     */
    where?: EcheanceWhereInput
    /**
     * Limit how many Echeances to update.
     */
    limit?: number
  }

  /**
   * Echeance upsert
   */
  export type EcheanceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Echeance
     */
    select?: EcheanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Echeance
     */
    omit?: EcheanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EcheanceInclude<ExtArgs> | null
    /**
     * The filter to search for the Echeance to update in case it exists.
     */
    where: EcheanceWhereUniqueInput
    /**
     * In case the Echeance found by the `where` argument doesn't exist, create a new Echeance with this data.
     */
    create: XOR<EcheanceCreateInput, EcheanceUncheckedCreateInput>
    /**
     * In case the Echeance was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EcheanceUpdateInput, EcheanceUncheckedUpdateInput>
  }

  /**
   * Echeance delete
   */
  export type EcheanceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Echeance
     */
    select?: EcheanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Echeance
     */
    omit?: EcheanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EcheanceInclude<ExtArgs> | null
    /**
     * Filter which Echeance to delete.
     */
    where: EcheanceWhereUniqueInput
  }

  /**
   * Echeance deleteMany
   */
  export type EcheanceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Echeances to delete
     */
    where?: EcheanceWhereInput
    /**
     * Limit how many Echeances to delete.
     */
    limit?: number
  }

  /**
   * Echeance findRaw
   */
  export type EcheanceFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Echeance aggregateRaw
   */
  export type EcheanceAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Echeance without action
   */
  export type EcheanceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Echeance
     */
    select?: EcheanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Echeance
     */
    omit?: EcheanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EcheanceInclude<ExtArgs> | null
  }


  /**
   * Model ActionLog
   */

  export type AggregateActionLog = {
    _count: ActionLogCountAggregateOutputType | null
    _min: ActionLogMinAggregateOutputType | null
    _max: ActionLogMaxAggregateOutputType | null
  }

  export type ActionLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    projetId: string | null
    action: string | null
    createdAt: Date | null
  }

  export type ActionLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    projetId: string | null
    action: string | null
    createdAt: Date | null
  }

  export type ActionLogCountAggregateOutputType = {
    id: number
    userId: number
    projetId: number
    action: number
    details: number
    createdAt: number
    _all: number
  }


  export type ActionLogMinAggregateInputType = {
    id?: true
    userId?: true
    projetId?: true
    action?: true
    createdAt?: true
  }

  export type ActionLogMaxAggregateInputType = {
    id?: true
    userId?: true
    projetId?: true
    action?: true
    createdAt?: true
  }

  export type ActionLogCountAggregateInputType = {
    id?: true
    userId?: true
    projetId?: true
    action?: true
    details?: true
    createdAt?: true
    _all?: true
  }

  export type ActionLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActionLog to aggregate.
     */
    where?: ActionLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActionLogs to fetch.
     */
    orderBy?: ActionLogOrderByWithRelationInput | ActionLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActionLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActionLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActionLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ActionLogs
    **/
    _count?: true | ActionLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActionLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActionLogMaxAggregateInputType
  }

  export type GetActionLogAggregateType<T extends ActionLogAggregateArgs> = {
        [P in keyof T & keyof AggregateActionLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActionLog[P]>
      : GetScalarType<T[P], AggregateActionLog[P]>
  }




  export type ActionLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActionLogWhereInput
    orderBy?: ActionLogOrderByWithAggregationInput | ActionLogOrderByWithAggregationInput[]
    by: ActionLogScalarFieldEnum[] | ActionLogScalarFieldEnum
    having?: ActionLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActionLogCountAggregateInputType | true
    _min?: ActionLogMinAggregateInputType
    _max?: ActionLogMaxAggregateInputType
  }

  export type ActionLogGroupByOutputType = {
    id: string
    userId: string
    projetId: string | null
    action: string
    details: JsonValue | null
    createdAt: Date
    _count: ActionLogCountAggregateOutputType | null
    _min: ActionLogMinAggregateOutputType | null
    _max: ActionLogMaxAggregateOutputType | null
  }

  type GetActionLogGroupByPayload<T extends ActionLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActionLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActionLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActionLogGroupByOutputType[P]>
            : GetScalarType<T[P], ActionLogGroupByOutputType[P]>
        }
      >
    >


  export type ActionLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    projetId?: boolean
    action?: boolean
    details?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    projet?: boolean | ActionLog$projetArgs<ExtArgs>
  }, ExtArgs["result"]["actionLog"]>



  export type ActionLogSelectScalar = {
    id?: boolean
    userId?: boolean
    projetId?: boolean
    action?: boolean
    details?: boolean
    createdAt?: boolean
  }

  export type ActionLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "projetId" | "action" | "details" | "createdAt", ExtArgs["result"]["actionLog"]>
  export type ActionLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    projet?: boolean | ActionLog$projetArgs<ExtArgs>
  }

  export type $ActionLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ActionLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      projet: Prisma.$ProjetPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      projetId: string | null
      action: string
      details: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["actionLog"]>
    composites: {}
  }

  type ActionLogGetPayload<S extends boolean | null | undefined | ActionLogDefaultArgs> = $Result.GetResult<Prisma.$ActionLogPayload, S>

  type ActionLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActionLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActionLogCountAggregateInputType | true
    }

  export interface ActionLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ActionLog'], meta: { name: 'ActionLog' } }
    /**
     * Find zero or one ActionLog that matches the filter.
     * @param {ActionLogFindUniqueArgs} args - Arguments to find a ActionLog
     * @example
     * // Get one ActionLog
     * const actionLog = await prisma.actionLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActionLogFindUniqueArgs>(args: SelectSubset<T, ActionLogFindUniqueArgs<ExtArgs>>): Prisma__ActionLogClient<$Result.GetResult<Prisma.$ActionLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ActionLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActionLogFindUniqueOrThrowArgs} args - Arguments to find a ActionLog
     * @example
     * // Get one ActionLog
     * const actionLog = await prisma.actionLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActionLogFindUniqueOrThrowArgs>(args: SelectSubset<T, ActionLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActionLogClient<$Result.GetResult<Prisma.$ActionLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActionLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionLogFindFirstArgs} args - Arguments to find a ActionLog
     * @example
     * // Get one ActionLog
     * const actionLog = await prisma.actionLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActionLogFindFirstArgs>(args?: SelectSubset<T, ActionLogFindFirstArgs<ExtArgs>>): Prisma__ActionLogClient<$Result.GetResult<Prisma.$ActionLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActionLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionLogFindFirstOrThrowArgs} args - Arguments to find a ActionLog
     * @example
     * // Get one ActionLog
     * const actionLog = await prisma.actionLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActionLogFindFirstOrThrowArgs>(args?: SelectSubset<T, ActionLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActionLogClient<$Result.GetResult<Prisma.$ActionLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ActionLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ActionLogs
     * const actionLogs = await prisma.actionLog.findMany()
     * 
     * // Get first 10 ActionLogs
     * const actionLogs = await prisma.actionLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const actionLogWithIdOnly = await prisma.actionLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActionLogFindManyArgs>(args?: SelectSubset<T, ActionLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActionLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ActionLog.
     * @param {ActionLogCreateArgs} args - Arguments to create a ActionLog.
     * @example
     * // Create one ActionLog
     * const ActionLog = await prisma.actionLog.create({
     *   data: {
     *     // ... data to create a ActionLog
     *   }
     * })
     * 
     */
    create<T extends ActionLogCreateArgs>(args: SelectSubset<T, ActionLogCreateArgs<ExtArgs>>): Prisma__ActionLogClient<$Result.GetResult<Prisma.$ActionLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ActionLogs.
     * @param {ActionLogCreateManyArgs} args - Arguments to create many ActionLogs.
     * @example
     * // Create many ActionLogs
     * const actionLog = await prisma.actionLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActionLogCreateManyArgs>(args?: SelectSubset<T, ActionLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ActionLog.
     * @param {ActionLogDeleteArgs} args - Arguments to delete one ActionLog.
     * @example
     * // Delete one ActionLog
     * const ActionLog = await prisma.actionLog.delete({
     *   where: {
     *     // ... filter to delete one ActionLog
     *   }
     * })
     * 
     */
    delete<T extends ActionLogDeleteArgs>(args: SelectSubset<T, ActionLogDeleteArgs<ExtArgs>>): Prisma__ActionLogClient<$Result.GetResult<Prisma.$ActionLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ActionLog.
     * @param {ActionLogUpdateArgs} args - Arguments to update one ActionLog.
     * @example
     * // Update one ActionLog
     * const actionLog = await prisma.actionLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActionLogUpdateArgs>(args: SelectSubset<T, ActionLogUpdateArgs<ExtArgs>>): Prisma__ActionLogClient<$Result.GetResult<Prisma.$ActionLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ActionLogs.
     * @param {ActionLogDeleteManyArgs} args - Arguments to filter ActionLogs to delete.
     * @example
     * // Delete a few ActionLogs
     * const { count } = await prisma.actionLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActionLogDeleteManyArgs>(args?: SelectSubset<T, ActionLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActionLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ActionLogs
     * const actionLog = await prisma.actionLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActionLogUpdateManyArgs>(args: SelectSubset<T, ActionLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ActionLog.
     * @param {ActionLogUpsertArgs} args - Arguments to update or create a ActionLog.
     * @example
     * // Update or create a ActionLog
     * const actionLog = await prisma.actionLog.upsert({
     *   create: {
     *     // ... data to create a ActionLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ActionLog we want to update
     *   }
     * })
     */
    upsert<T extends ActionLogUpsertArgs>(args: SelectSubset<T, ActionLogUpsertArgs<ExtArgs>>): Prisma__ActionLogClient<$Result.GetResult<Prisma.$ActionLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ActionLogs that matches the filter.
     * @param {ActionLogFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const actionLog = await prisma.actionLog.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: ActionLogFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a ActionLog.
     * @param {ActionLogAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const actionLog = await prisma.actionLog.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: ActionLogAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of ActionLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionLogCountArgs} args - Arguments to filter ActionLogs to count.
     * @example
     * // Count the number of ActionLogs
     * const count = await prisma.actionLog.count({
     *   where: {
     *     // ... the filter for the ActionLogs we want to count
     *   }
     * })
    **/
    count<T extends ActionLogCountArgs>(
      args?: Subset<T, ActionLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActionLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ActionLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActionLogAggregateArgs>(args: Subset<T, ActionLogAggregateArgs>): Prisma.PrismaPromise<GetActionLogAggregateType<T>>

    /**
     * Group by ActionLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActionLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActionLogGroupByArgs['orderBy'] }
        : { orderBy?: ActionLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActionLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActionLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ActionLog model
   */
  readonly fields: ActionLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ActionLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActionLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    projet<T extends ActionLog$projetArgs<ExtArgs> = {}>(args?: Subset<T, ActionLog$projetArgs<ExtArgs>>): Prisma__ProjetClient<$Result.GetResult<Prisma.$ProjetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ActionLog model
   */
  interface ActionLogFieldRefs {
    readonly id: FieldRef<"ActionLog", 'String'>
    readonly userId: FieldRef<"ActionLog", 'String'>
    readonly projetId: FieldRef<"ActionLog", 'String'>
    readonly action: FieldRef<"ActionLog", 'String'>
    readonly details: FieldRef<"ActionLog", 'Json'>
    readonly createdAt: FieldRef<"ActionLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ActionLog findUnique
   */
  export type ActionLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionLog
     */
    select?: ActionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionLog
     */
    omit?: ActionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionLogInclude<ExtArgs> | null
    /**
     * Filter, which ActionLog to fetch.
     */
    where: ActionLogWhereUniqueInput
  }

  /**
   * ActionLog findUniqueOrThrow
   */
  export type ActionLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionLog
     */
    select?: ActionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionLog
     */
    omit?: ActionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionLogInclude<ExtArgs> | null
    /**
     * Filter, which ActionLog to fetch.
     */
    where: ActionLogWhereUniqueInput
  }

  /**
   * ActionLog findFirst
   */
  export type ActionLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionLog
     */
    select?: ActionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionLog
     */
    omit?: ActionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionLogInclude<ExtArgs> | null
    /**
     * Filter, which ActionLog to fetch.
     */
    where?: ActionLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActionLogs to fetch.
     */
    orderBy?: ActionLogOrderByWithRelationInput | ActionLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActionLogs.
     */
    cursor?: ActionLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActionLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActionLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActionLogs.
     */
    distinct?: ActionLogScalarFieldEnum | ActionLogScalarFieldEnum[]
  }

  /**
   * ActionLog findFirstOrThrow
   */
  export type ActionLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionLog
     */
    select?: ActionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionLog
     */
    omit?: ActionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionLogInclude<ExtArgs> | null
    /**
     * Filter, which ActionLog to fetch.
     */
    where?: ActionLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActionLogs to fetch.
     */
    orderBy?: ActionLogOrderByWithRelationInput | ActionLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActionLogs.
     */
    cursor?: ActionLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActionLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActionLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActionLogs.
     */
    distinct?: ActionLogScalarFieldEnum | ActionLogScalarFieldEnum[]
  }

  /**
   * ActionLog findMany
   */
  export type ActionLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionLog
     */
    select?: ActionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionLog
     */
    omit?: ActionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionLogInclude<ExtArgs> | null
    /**
     * Filter, which ActionLogs to fetch.
     */
    where?: ActionLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActionLogs to fetch.
     */
    orderBy?: ActionLogOrderByWithRelationInput | ActionLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ActionLogs.
     */
    cursor?: ActionLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActionLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActionLogs.
     */
    skip?: number
    distinct?: ActionLogScalarFieldEnum | ActionLogScalarFieldEnum[]
  }

  /**
   * ActionLog create
   */
  export type ActionLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionLog
     */
    select?: ActionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionLog
     */
    omit?: ActionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionLogInclude<ExtArgs> | null
    /**
     * The data needed to create a ActionLog.
     */
    data: XOR<ActionLogCreateInput, ActionLogUncheckedCreateInput>
  }

  /**
   * ActionLog createMany
   */
  export type ActionLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ActionLogs.
     */
    data: ActionLogCreateManyInput | ActionLogCreateManyInput[]
  }

  /**
   * ActionLog update
   */
  export type ActionLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionLog
     */
    select?: ActionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionLog
     */
    omit?: ActionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionLogInclude<ExtArgs> | null
    /**
     * The data needed to update a ActionLog.
     */
    data: XOR<ActionLogUpdateInput, ActionLogUncheckedUpdateInput>
    /**
     * Choose, which ActionLog to update.
     */
    where: ActionLogWhereUniqueInput
  }

  /**
   * ActionLog updateMany
   */
  export type ActionLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ActionLogs.
     */
    data: XOR<ActionLogUpdateManyMutationInput, ActionLogUncheckedUpdateManyInput>
    /**
     * Filter which ActionLogs to update
     */
    where?: ActionLogWhereInput
    /**
     * Limit how many ActionLogs to update.
     */
    limit?: number
  }

  /**
   * ActionLog upsert
   */
  export type ActionLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionLog
     */
    select?: ActionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionLog
     */
    omit?: ActionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionLogInclude<ExtArgs> | null
    /**
     * The filter to search for the ActionLog to update in case it exists.
     */
    where: ActionLogWhereUniqueInput
    /**
     * In case the ActionLog found by the `where` argument doesn't exist, create a new ActionLog with this data.
     */
    create: XOR<ActionLogCreateInput, ActionLogUncheckedCreateInput>
    /**
     * In case the ActionLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActionLogUpdateInput, ActionLogUncheckedUpdateInput>
  }

  /**
   * ActionLog delete
   */
  export type ActionLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionLog
     */
    select?: ActionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionLog
     */
    omit?: ActionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionLogInclude<ExtArgs> | null
    /**
     * Filter which ActionLog to delete.
     */
    where: ActionLogWhereUniqueInput
  }

  /**
   * ActionLog deleteMany
   */
  export type ActionLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActionLogs to delete
     */
    where?: ActionLogWhereInput
    /**
     * Limit how many ActionLogs to delete.
     */
    limit?: number
  }

  /**
   * ActionLog findRaw
   */
  export type ActionLogFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * ActionLog aggregateRaw
   */
  export type ActionLogAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * ActionLog.projet
   */
  export type ActionLog$projetArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Projet
     */
    select?: ProjetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Projet
     */
    omit?: ProjetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjetInclude<ExtArgs> | null
    where?: ProjetWhereInput
  }

  /**
   * ActionLog without action
   */
  export type ActionLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionLog
     */
    select?: ActionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionLog
     */
    omit?: ActionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionLogInclude<ExtArgs> | null
  }


  /**
   * Model Societe
   */

  export type AggregateSociete = {
    _count: SocieteCountAggregateOutputType | null
    _min: SocieteMinAggregateOutputType | null
    _max: SocieteMaxAggregateOutputType | null
  }

  export type SocieteMinAggregateOutputType = {
    id: string | null
    code: string | null
    denomination: string | null
    nomCommercial: string | null
    adresseSiegeSocial: string | null
    adresseActivite: string | null
    formeJuridique: string | null
    mf: string | null
    capitalSocial: string | null
    contactFixe: string | null
    contactFax: string | null
    contactMobile: string | null
    adresseEmail: string | null
    rib: string | null
    banque: string | null
    codeSteg: string | null
    codeAnme: string | null
    validiteAnme: string | null
    gerant: string | null
    pdfLogoDataUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SocieteMaxAggregateOutputType = {
    id: string | null
    code: string | null
    denomination: string | null
    nomCommercial: string | null
    adresseSiegeSocial: string | null
    adresseActivite: string | null
    formeJuridique: string | null
    mf: string | null
    capitalSocial: string | null
    contactFixe: string | null
    contactFax: string | null
    contactMobile: string | null
    adresseEmail: string | null
    rib: string | null
    banque: string | null
    codeSteg: string | null
    codeAnme: string | null
    validiteAnme: string | null
    gerant: string | null
    pdfLogoDataUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SocieteCountAggregateOutputType = {
    id: number
    code: number
    denomination: number
    nomCommercial: number
    adresseSiegeSocial: number
    adresseActivite: number
    formeJuridique: number
    mf: number
    capitalSocial: number
    contactFixe: number
    contactFax: number
    contactMobile: number
    adresseEmail: number
    rib: number
    banque: number
    codeSteg: number
    codeAnme: number
    validiteAnme: number
    gerant: number
    pdfLogoDataUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SocieteMinAggregateInputType = {
    id?: true
    code?: true
    denomination?: true
    nomCommercial?: true
    adresseSiegeSocial?: true
    adresseActivite?: true
    formeJuridique?: true
    mf?: true
    capitalSocial?: true
    contactFixe?: true
    contactFax?: true
    contactMobile?: true
    adresseEmail?: true
    rib?: true
    banque?: true
    codeSteg?: true
    codeAnme?: true
    validiteAnme?: true
    gerant?: true
    pdfLogoDataUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SocieteMaxAggregateInputType = {
    id?: true
    code?: true
    denomination?: true
    nomCommercial?: true
    adresseSiegeSocial?: true
    adresseActivite?: true
    formeJuridique?: true
    mf?: true
    capitalSocial?: true
    contactFixe?: true
    contactFax?: true
    contactMobile?: true
    adresseEmail?: true
    rib?: true
    banque?: true
    codeSteg?: true
    codeAnme?: true
    validiteAnme?: true
    gerant?: true
    pdfLogoDataUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SocieteCountAggregateInputType = {
    id?: true
    code?: true
    denomination?: true
    nomCommercial?: true
    adresseSiegeSocial?: true
    adresseActivite?: true
    formeJuridique?: true
    mf?: true
    capitalSocial?: true
    contactFixe?: true
    contactFax?: true
    contactMobile?: true
    adresseEmail?: true
    rib?: true
    banque?: true
    codeSteg?: true
    codeAnme?: true
    validiteAnme?: true
    gerant?: true
    pdfLogoDataUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SocieteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Societe to aggregate.
     */
    where?: SocieteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Societes to fetch.
     */
    orderBy?: SocieteOrderByWithRelationInput | SocieteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SocieteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Societes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Societes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Societes
    **/
    _count?: true | SocieteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SocieteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SocieteMaxAggregateInputType
  }

  export type GetSocieteAggregateType<T extends SocieteAggregateArgs> = {
        [P in keyof T & keyof AggregateSociete]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSociete[P]>
      : GetScalarType<T[P], AggregateSociete[P]>
  }




  export type SocieteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SocieteWhereInput
    orderBy?: SocieteOrderByWithAggregationInput | SocieteOrderByWithAggregationInput[]
    by: SocieteScalarFieldEnum[] | SocieteScalarFieldEnum
    having?: SocieteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SocieteCountAggregateInputType | true
    _min?: SocieteMinAggregateInputType
    _max?: SocieteMaxAggregateInputType
  }

  export type SocieteGroupByOutputType = {
    id: string
    code: string
    denomination: string
    nomCommercial: string
    adresseSiegeSocial: string
    adresseActivite: string
    formeJuridique: string
    mf: string
    capitalSocial: string
    contactFixe: string
    contactFax: string
    contactMobile: string
    adresseEmail: string
    rib: string
    banque: string
    codeSteg: string
    codeAnme: string
    validiteAnme: string
    gerant: string
    pdfLogoDataUrl: string
    createdAt: Date
    updatedAt: Date
    _count: SocieteCountAggregateOutputType | null
    _min: SocieteMinAggregateOutputType | null
    _max: SocieteMaxAggregateOutputType | null
  }

  type GetSocieteGroupByPayload<T extends SocieteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SocieteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SocieteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SocieteGroupByOutputType[P]>
            : GetScalarType<T[P], SocieteGroupByOutputType[P]>
        }
      >
    >


  export type SocieteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    denomination?: boolean
    nomCommercial?: boolean
    adresseSiegeSocial?: boolean
    adresseActivite?: boolean
    formeJuridique?: boolean
    mf?: boolean
    capitalSocial?: boolean
    contactFixe?: boolean
    contactFax?: boolean
    contactMobile?: boolean
    adresseEmail?: boolean
    rib?: boolean
    banque?: boolean
    codeSteg?: boolean
    codeAnme?: boolean
    validiteAnme?: boolean
    gerant?: boolean
    pdfLogoDataUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["societe"]>



  export type SocieteSelectScalar = {
    id?: boolean
    code?: boolean
    denomination?: boolean
    nomCommercial?: boolean
    adresseSiegeSocial?: boolean
    adresseActivite?: boolean
    formeJuridique?: boolean
    mf?: boolean
    capitalSocial?: boolean
    contactFixe?: boolean
    contactFax?: boolean
    contactMobile?: boolean
    adresseEmail?: boolean
    rib?: boolean
    banque?: boolean
    codeSteg?: boolean
    codeAnme?: boolean
    validiteAnme?: boolean
    gerant?: boolean
    pdfLogoDataUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SocieteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "denomination" | "nomCommercial" | "adresseSiegeSocial" | "adresseActivite" | "formeJuridique" | "mf" | "capitalSocial" | "contactFixe" | "contactFax" | "contactMobile" | "adresseEmail" | "rib" | "banque" | "codeSteg" | "codeAnme" | "validiteAnme" | "gerant" | "pdfLogoDataUrl" | "createdAt" | "updatedAt", ExtArgs["result"]["societe"]>

  export type $SocietePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Societe"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      denomination: string
      nomCommercial: string
      adresseSiegeSocial: string
      adresseActivite: string
      formeJuridique: string
      mf: string
      capitalSocial: string
      contactFixe: string
      contactFax: string
      contactMobile: string
      adresseEmail: string
      rib: string
      banque: string
      codeSteg: string
      codeAnme: string
      validiteAnme: string
      gerant: string
      pdfLogoDataUrl: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["societe"]>
    composites: {}
  }

  type SocieteGetPayload<S extends boolean | null | undefined | SocieteDefaultArgs> = $Result.GetResult<Prisma.$SocietePayload, S>

  type SocieteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SocieteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SocieteCountAggregateInputType | true
    }

  export interface SocieteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Societe'], meta: { name: 'Societe' } }
    /**
     * Find zero or one Societe that matches the filter.
     * @param {SocieteFindUniqueArgs} args - Arguments to find a Societe
     * @example
     * // Get one Societe
     * const societe = await prisma.societe.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SocieteFindUniqueArgs>(args: SelectSubset<T, SocieteFindUniqueArgs<ExtArgs>>): Prisma__SocieteClient<$Result.GetResult<Prisma.$SocietePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Societe that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SocieteFindUniqueOrThrowArgs} args - Arguments to find a Societe
     * @example
     * // Get one Societe
     * const societe = await prisma.societe.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SocieteFindUniqueOrThrowArgs>(args: SelectSubset<T, SocieteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SocieteClient<$Result.GetResult<Prisma.$SocietePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Societe that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocieteFindFirstArgs} args - Arguments to find a Societe
     * @example
     * // Get one Societe
     * const societe = await prisma.societe.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SocieteFindFirstArgs>(args?: SelectSubset<T, SocieteFindFirstArgs<ExtArgs>>): Prisma__SocieteClient<$Result.GetResult<Prisma.$SocietePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Societe that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocieteFindFirstOrThrowArgs} args - Arguments to find a Societe
     * @example
     * // Get one Societe
     * const societe = await prisma.societe.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SocieteFindFirstOrThrowArgs>(args?: SelectSubset<T, SocieteFindFirstOrThrowArgs<ExtArgs>>): Prisma__SocieteClient<$Result.GetResult<Prisma.$SocietePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Societes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocieteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Societes
     * const societes = await prisma.societe.findMany()
     * 
     * // Get first 10 Societes
     * const societes = await prisma.societe.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const societeWithIdOnly = await prisma.societe.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SocieteFindManyArgs>(args?: SelectSubset<T, SocieteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SocietePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Societe.
     * @param {SocieteCreateArgs} args - Arguments to create a Societe.
     * @example
     * // Create one Societe
     * const Societe = await prisma.societe.create({
     *   data: {
     *     // ... data to create a Societe
     *   }
     * })
     * 
     */
    create<T extends SocieteCreateArgs>(args: SelectSubset<T, SocieteCreateArgs<ExtArgs>>): Prisma__SocieteClient<$Result.GetResult<Prisma.$SocietePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Societes.
     * @param {SocieteCreateManyArgs} args - Arguments to create many Societes.
     * @example
     * // Create many Societes
     * const societe = await prisma.societe.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SocieteCreateManyArgs>(args?: SelectSubset<T, SocieteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Societe.
     * @param {SocieteDeleteArgs} args - Arguments to delete one Societe.
     * @example
     * // Delete one Societe
     * const Societe = await prisma.societe.delete({
     *   where: {
     *     // ... filter to delete one Societe
     *   }
     * })
     * 
     */
    delete<T extends SocieteDeleteArgs>(args: SelectSubset<T, SocieteDeleteArgs<ExtArgs>>): Prisma__SocieteClient<$Result.GetResult<Prisma.$SocietePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Societe.
     * @param {SocieteUpdateArgs} args - Arguments to update one Societe.
     * @example
     * // Update one Societe
     * const societe = await prisma.societe.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SocieteUpdateArgs>(args: SelectSubset<T, SocieteUpdateArgs<ExtArgs>>): Prisma__SocieteClient<$Result.GetResult<Prisma.$SocietePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Societes.
     * @param {SocieteDeleteManyArgs} args - Arguments to filter Societes to delete.
     * @example
     * // Delete a few Societes
     * const { count } = await prisma.societe.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SocieteDeleteManyArgs>(args?: SelectSubset<T, SocieteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Societes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocieteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Societes
     * const societe = await prisma.societe.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SocieteUpdateManyArgs>(args: SelectSubset<T, SocieteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Societe.
     * @param {SocieteUpsertArgs} args - Arguments to update or create a Societe.
     * @example
     * // Update or create a Societe
     * const societe = await prisma.societe.upsert({
     *   create: {
     *     // ... data to create a Societe
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Societe we want to update
     *   }
     * })
     */
    upsert<T extends SocieteUpsertArgs>(args: SelectSubset<T, SocieteUpsertArgs<ExtArgs>>): Prisma__SocieteClient<$Result.GetResult<Prisma.$SocietePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Societes that matches the filter.
     * @param {SocieteFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const societe = await prisma.societe.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: SocieteFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Societe.
     * @param {SocieteAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const societe = await prisma.societe.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: SocieteAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Societes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocieteCountArgs} args - Arguments to filter Societes to count.
     * @example
     * // Count the number of Societes
     * const count = await prisma.societe.count({
     *   where: {
     *     // ... the filter for the Societes we want to count
     *   }
     * })
    **/
    count<T extends SocieteCountArgs>(
      args?: Subset<T, SocieteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SocieteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Societe.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocieteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SocieteAggregateArgs>(args: Subset<T, SocieteAggregateArgs>): Prisma.PrismaPromise<GetSocieteAggregateType<T>>

    /**
     * Group by Societe.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocieteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SocieteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SocieteGroupByArgs['orderBy'] }
        : { orderBy?: SocieteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SocieteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSocieteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Societe model
   */
  readonly fields: SocieteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Societe.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SocieteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Societe model
   */
  interface SocieteFieldRefs {
    readonly id: FieldRef<"Societe", 'String'>
    readonly code: FieldRef<"Societe", 'String'>
    readonly denomination: FieldRef<"Societe", 'String'>
    readonly nomCommercial: FieldRef<"Societe", 'String'>
    readonly adresseSiegeSocial: FieldRef<"Societe", 'String'>
    readonly adresseActivite: FieldRef<"Societe", 'String'>
    readonly formeJuridique: FieldRef<"Societe", 'String'>
    readonly mf: FieldRef<"Societe", 'String'>
    readonly capitalSocial: FieldRef<"Societe", 'String'>
    readonly contactFixe: FieldRef<"Societe", 'String'>
    readonly contactFax: FieldRef<"Societe", 'String'>
    readonly contactMobile: FieldRef<"Societe", 'String'>
    readonly adresseEmail: FieldRef<"Societe", 'String'>
    readonly rib: FieldRef<"Societe", 'String'>
    readonly banque: FieldRef<"Societe", 'String'>
    readonly codeSteg: FieldRef<"Societe", 'String'>
    readonly codeAnme: FieldRef<"Societe", 'String'>
    readonly validiteAnme: FieldRef<"Societe", 'String'>
    readonly gerant: FieldRef<"Societe", 'String'>
    readonly pdfLogoDataUrl: FieldRef<"Societe", 'String'>
    readonly createdAt: FieldRef<"Societe", 'DateTime'>
    readonly updatedAt: FieldRef<"Societe", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Societe findUnique
   */
  export type SocieteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Societe
     */
    select?: SocieteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Societe
     */
    omit?: SocieteOmit<ExtArgs> | null
    /**
     * Filter, which Societe to fetch.
     */
    where: SocieteWhereUniqueInput
  }

  /**
   * Societe findUniqueOrThrow
   */
  export type SocieteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Societe
     */
    select?: SocieteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Societe
     */
    omit?: SocieteOmit<ExtArgs> | null
    /**
     * Filter, which Societe to fetch.
     */
    where: SocieteWhereUniqueInput
  }

  /**
   * Societe findFirst
   */
  export type SocieteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Societe
     */
    select?: SocieteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Societe
     */
    omit?: SocieteOmit<ExtArgs> | null
    /**
     * Filter, which Societe to fetch.
     */
    where?: SocieteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Societes to fetch.
     */
    orderBy?: SocieteOrderByWithRelationInput | SocieteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Societes.
     */
    cursor?: SocieteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Societes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Societes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Societes.
     */
    distinct?: SocieteScalarFieldEnum | SocieteScalarFieldEnum[]
  }

  /**
   * Societe findFirstOrThrow
   */
  export type SocieteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Societe
     */
    select?: SocieteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Societe
     */
    omit?: SocieteOmit<ExtArgs> | null
    /**
     * Filter, which Societe to fetch.
     */
    where?: SocieteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Societes to fetch.
     */
    orderBy?: SocieteOrderByWithRelationInput | SocieteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Societes.
     */
    cursor?: SocieteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Societes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Societes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Societes.
     */
    distinct?: SocieteScalarFieldEnum | SocieteScalarFieldEnum[]
  }

  /**
   * Societe findMany
   */
  export type SocieteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Societe
     */
    select?: SocieteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Societe
     */
    omit?: SocieteOmit<ExtArgs> | null
    /**
     * Filter, which Societes to fetch.
     */
    where?: SocieteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Societes to fetch.
     */
    orderBy?: SocieteOrderByWithRelationInput | SocieteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Societes.
     */
    cursor?: SocieteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Societes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Societes.
     */
    skip?: number
    distinct?: SocieteScalarFieldEnum | SocieteScalarFieldEnum[]
  }

  /**
   * Societe create
   */
  export type SocieteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Societe
     */
    select?: SocieteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Societe
     */
    omit?: SocieteOmit<ExtArgs> | null
    /**
     * The data needed to create a Societe.
     */
    data: XOR<SocieteCreateInput, SocieteUncheckedCreateInput>
  }

  /**
   * Societe createMany
   */
  export type SocieteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Societes.
     */
    data: SocieteCreateManyInput | SocieteCreateManyInput[]
  }

  /**
   * Societe update
   */
  export type SocieteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Societe
     */
    select?: SocieteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Societe
     */
    omit?: SocieteOmit<ExtArgs> | null
    /**
     * The data needed to update a Societe.
     */
    data: XOR<SocieteUpdateInput, SocieteUncheckedUpdateInput>
    /**
     * Choose, which Societe to update.
     */
    where: SocieteWhereUniqueInput
  }

  /**
   * Societe updateMany
   */
  export type SocieteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Societes.
     */
    data: XOR<SocieteUpdateManyMutationInput, SocieteUncheckedUpdateManyInput>
    /**
     * Filter which Societes to update
     */
    where?: SocieteWhereInput
    /**
     * Limit how many Societes to update.
     */
    limit?: number
  }

  /**
   * Societe upsert
   */
  export type SocieteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Societe
     */
    select?: SocieteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Societe
     */
    omit?: SocieteOmit<ExtArgs> | null
    /**
     * The filter to search for the Societe to update in case it exists.
     */
    where: SocieteWhereUniqueInput
    /**
     * In case the Societe found by the `where` argument doesn't exist, create a new Societe with this data.
     */
    create: XOR<SocieteCreateInput, SocieteUncheckedCreateInput>
    /**
     * In case the Societe was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SocieteUpdateInput, SocieteUncheckedUpdateInput>
  }

  /**
   * Societe delete
   */
  export type SocieteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Societe
     */
    select?: SocieteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Societe
     */
    omit?: SocieteOmit<ExtArgs> | null
    /**
     * Filter which Societe to delete.
     */
    where: SocieteWhereUniqueInput
  }

  /**
   * Societe deleteMany
   */
  export type SocieteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Societes to delete
     */
    where?: SocieteWhereInput
    /**
     * Limit how many Societes to delete.
     */
    limit?: number
  }

  /**
   * Societe findRaw
   */
  export type SocieteFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Societe aggregateRaw
   */
  export type SocieteAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Societe without action
   */
  export type SocieteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Societe
     */
    select?: SocieteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Societe
     */
    omit?: SocieteOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const UserScalarFieldEnum: {
    id: 'id',
    nom: 'nom',
    prenom: 'prenom',
    email: 'email',
    telephone: 'telephone',
    password: 'password',
    role: 'role',
    actif: 'actif',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdBy: 'createdBy',
    lastLoginAt: 'lastLoginAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    refreshToken: 'refreshToken',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const ProjetScalarFieldEnum: {
    id: 'id',
    codeBarres: 'codeBarres',
    reference: 'reference',
    abonnes: 'abonnes',
    email: 'email',
    cin: 'cin',
    contact: 'contact',
    coordonneesGps: 'coordonneesGps',
    adresseLieuImplantation: 'adresseLieuImplantation',
    presenteParMF: 'presenteParMF',
    district: 'district',
    gouvernorat: 'gouvernorat',
    delegation: 'delegation',
    municipalite: 'municipalite',
    typeProjet: 'typeProjet',
    etatDossier: 'etatDossier',
    classementDossier: 'classementDossier',
    commentaire: 'commentaire',
    approbationCommerciale: 'approbationCommerciale',
    approbationTechnique: 'approbationTechnique',
    executionInstallation: 'executionInstallation',
    reception: 'reception',
    procesVerbal: 'procesVerbal',
    contratAchat: 'contratAchat',
    montantFinancement: 'montantFinancement',
    tauxInteret: 'tauxInteret',
    banque: 'banque',
    agentCommercialId: 'agentCommercialId',
    agentCommercialAutre: 'agentCommercialAutre',
    puissanceInstallee: 'puissanceInstallee',
    typeCompteur: 'typeCompteur',
    numeroCompteur: 'numeroCompteur',
    calibreDisjoncteur: 'calibreDisjoncteur',
    puissanceSouscrite: 'puissanceSouscrite',
    productionPrevisionnelle: 'productionPrevisionnelle',
    consommationAnnuelle: 'consommationAnnuelle',
    nbModules: 'nbModules',
    puUnitairePV: 'puUnitairePV',
    marquePV: 'marquePV',
    modelePV: 'modelePV',
    nbOnduleurs: 'nbOnduleurs',
    puUnitaireOnd: 'puUnitaireOnd',
    puOndSiAutreW: 'puOndSiAutreW',
    marqueOnd: 'marqueOnd',
    modeleOnd: 'modeleOnd',
    autreModeleOnd: 'autreModeleOnd',
    equipementSurMesure: 'equipementSurMesure',
    interventionSurMesure: 'interventionSurMesure',
    rapportPuissance: 'rapportPuissance',
    dateDepotDossier: 'dateDepotDossier',
    dateApprobation: 'dateApprobation',
    dateInstallation: 'dateInstallation',
    dateDepotDemandeMES: 'dateDepotDemandeMES',
    datePaiementPoseCompteurProsol: 'datePaiementPoseCompteurProsol',
    dateMES: 'dateMES',
    nPolice: 'nPolice',
    nLotDebProsol: 'nLotDebProsol',
    saisieProsol: 'saisieProsol',
    nLotDeblocageSubvention: 'nLotDeblocageSubvention',
    deblocageProsol: 'deblocageProsol',
    conditionSubvention: 'conditionSubvention',
    saisieSubvention: 'saisieSubvention',
    deblocageSubvention: 'deblocageSubvention',
    nDevis: 'nDevis',
    dateDevis: 'dateDevis',
    nFacture: 'nFacture',
    dateFacture: 'dateFacture',
    montantHT: 'montantHT',
    tva: 'tva',
    montantTTC: 'montantTTC',
    montantTTCFinal: 'montantTTCFinal',
    montantAutofinancement: 'montantAutofinancement',
    fraisPoseCmptProsol: 'fraisPoseCmptProsol',
    paiement1erFactureSTEG: 'paiement1erFactureSTEG',
    paiement2emeFactureSTEG: 'paiement2emeFactureSTEG',
    fraisAugmentationCalibre: 'fraisAugmentationCalibre',
    fraisMutationElec: 'fraisMutationElec',
    fraisMutationGaz: 'fraisMutationGaz',
    fraisPassageMonoTri: 'fraisPassageMonoTri',
    autresFrais: 'autresFrais',
    reglementClient: 'reglementClient',
    resteAPayer: 'resteAPayer',
    subventionDemandee: 'subventionDemandee',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProjetScalarFieldEnum = (typeof ProjetScalarFieldEnum)[keyof typeof ProjetScalarFieldEnum]


  export const EcheanceScalarFieldEnum: {
    id: 'id',
    projetId: 'projetId',
    numero: 'numero',
    montant: 'montant',
    date: 'date',
    modePaiement: 'modePaiement',
    description: 'description'
  };

  export type EcheanceScalarFieldEnum = (typeof EcheanceScalarFieldEnum)[keyof typeof EcheanceScalarFieldEnum]


  export const ActionLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    projetId: 'projetId',
    action: 'action',
    details: 'details',
    createdAt: 'createdAt'
  };

  export type ActionLogScalarFieldEnum = (typeof ActionLogScalarFieldEnum)[keyof typeof ActionLogScalarFieldEnum]


  export const SocieteScalarFieldEnum: {
    id: 'id',
    code: 'code',
    denomination: 'denomination',
    nomCommercial: 'nomCommercial',
    adresseSiegeSocial: 'adresseSiegeSocial',
    adresseActivite: 'adresseActivite',
    formeJuridique: 'formeJuridique',
    mf: 'mf',
    capitalSocial: 'capitalSocial',
    contactFixe: 'contactFixe',
    contactFax: 'contactFax',
    contactMobile: 'contactMobile',
    adresseEmail: 'adresseEmail',
    rib: 'rib',
    banque: 'banque',
    codeSteg: 'codeSteg',
    codeAnme: 'codeAnme',
    validiteAnme: 'validiteAnme',
    gerant: 'gerant',
    pdfLogoDataUrl: 'pdfLogoDataUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SocieteScalarFieldEnum = (typeof SocieteScalarFieldEnum)[keyof typeof SocieteScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'TypeProjet'
   */
  export type EnumTypeProjetFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TypeProjet'>
    


  /**
   * Reference to a field of type 'TypeProjet[]'
   */
  export type ListEnumTypeProjetFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TypeProjet[]'>
    


  /**
   * Reference to a field of type 'EtatDossier'
   */
  export type EnumEtatDossierFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EtatDossier'>
    


  /**
   * Reference to a field of type 'EtatDossier[]'
   */
  export type ListEnumEtatDossierFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EtatDossier[]'>
    


  /**
   * Reference to a field of type 'ClassementDossier'
   */
  export type EnumClassementDossierFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ClassementDossier'>
    


  /**
   * Reference to a field of type 'ClassementDossier[]'
   */
  export type ListEnumClassementDossierFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ClassementDossier[]'>
    


  /**
   * Reference to a field of type 'StatutApprobation'
   */
  export type EnumStatutApprobationFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatutApprobation'>
    


  /**
   * Reference to a field of type 'StatutApprobation[]'
   */
  export type ListEnumStatutApprobationFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatutApprobation[]'>
    


  /**
   * Reference to a field of type 'TypeContrat'
   */
  export type EnumTypeContratFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TypeContrat'>
    


  /**
   * Reference to a field of type 'TypeContrat[]'
   */
  export type ListEnumTypeContratFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TypeContrat[]'>
    


  /**
   * Reference to a field of type 'TypeCompteur'
   */
  export type EnumTypeCompteurFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TypeCompteur'>
    


  /**
   * Reference to a field of type 'TypeCompteur[]'
   */
  export type ListEnumTypeCompteurFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TypeCompteur[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    nom?: StringFilter<"User"> | string
    prenom?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    telephone?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    actif?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    createdBy?: StringNullableFilter<"User"> | string | null
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    sessions?: SessionListRelationFilter
    projets?: ProjetListRelationFilter
    logs?: ActionLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrder
    telephone?: SortOrder
    password?: SortOrder
    role?: SortOrder
    actif?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    lastLoginAt?: SortOrder
    sessions?: SessionOrderByRelationAggregateInput
    projets?: ProjetOrderByRelationAggregateInput
    logs?: ActionLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    nom?: StringFilter<"User"> | string
    prenom?: StringFilter<"User"> | string
    telephone?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    actif?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    createdBy?: StringNullableFilter<"User"> | string | null
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    sessions?: SessionListRelationFilter
    projets?: ProjetListRelationFilter
    logs?: ActionLogListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrder
    telephone?: SortOrder
    password?: SortOrder
    role?: SortOrder
    actif?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    lastLoginAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    nom?: StringWithAggregatesFilter<"User"> | string
    prenom?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    telephone?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    actif?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    createdBy?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastLoginAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    refreshToken?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    refreshToken?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    refreshToken?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "refreshToken">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    refreshToken?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    refreshToken?: StringWithAggregatesFilter<"Session"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type ProjetWhereInput = {
    AND?: ProjetWhereInput | ProjetWhereInput[]
    OR?: ProjetWhereInput[]
    NOT?: ProjetWhereInput | ProjetWhereInput[]
    id?: StringFilter<"Projet"> | string
    codeBarres?: StringNullableFilter<"Projet"> | string | null
    reference?: StringFilter<"Projet"> | string
    abonnes?: StringFilter<"Projet"> | string
    email?: StringNullableFilter<"Projet"> | string | null
    cin?: StringNullableFilter<"Projet"> | string | null
    contact?: StringNullableFilter<"Projet"> | string | null
    coordonneesGps?: StringNullableFilter<"Projet"> | string | null
    adresseLieuImplantation?: StringNullableFilter<"Projet"> | string | null
    presenteParMF?: StringNullableFilter<"Projet"> | string | null
    district?: StringNullableFilter<"Projet"> | string | null
    gouvernorat?: StringNullableFilter<"Projet"> | string | null
    delegation?: StringNullableFilter<"Projet"> | string | null
    municipalite?: StringNullableFilter<"Projet"> | string | null
    typeProjet?: EnumTypeProjetFilter<"Projet"> | $Enums.TypeProjet
    etatDossier?: EnumEtatDossierFilter<"Projet"> | $Enums.EtatDossier
    classementDossier?: EnumClassementDossierFilter<"Projet"> | $Enums.ClassementDossier
    commentaire?: StringNullableFilter<"Projet"> | string | null
    approbationCommerciale?: EnumStatutApprobationFilter<"Projet"> | $Enums.StatutApprobation
    approbationTechnique?: EnumStatutApprobationFilter<"Projet"> | $Enums.StatutApprobation
    executionInstallation?: StringNullableFilter<"Projet"> | string | null
    reception?: StringNullableFilter<"Projet"> | string | null
    procesVerbal?: StringNullableFilter<"Projet"> | string | null
    contratAchat?: EnumTypeContratNullableFilter<"Projet"> | $Enums.TypeContrat | null
    montantFinancement?: StringNullableFilter<"Projet"> | string | null
    tauxInteret?: StringNullableFilter<"Projet"> | string | null
    banque?: StringNullableFilter<"Projet"> | string | null
    agentCommercialId?: StringNullableFilter<"Projet"> | string | null
    agentCommercialAutre?: StringNullableFilter<"Projet"> | string | null
    puissanceInstallee?: StringNullableFilter<"Projet"> | string | null
    typeCompteur?: EnumTypeCompteurNullableFilter<"Projet"> | $Enums.TypeCompteur | null
    numeroCompteur?: StringNullableFilter<"Projet"> | string | null
    calibreDisjoncteur?: StringNullableFilter<"Projet"> | string | null
    puissanceSouscrite?: StringNullableFilter<"Projet"> | string | null
    productionPrevisionnelle?: StringNullableFilter<"Projet"> | string | null
    consommationAnnuelle?: StringNullableFilter<"Projet"> | string | null
    nbModules?: IntNullableFilter<"Projet"> | number | null
    puUnitairePV?: StringNullableFilter<"Projet"> | string | null
    marquePV?: StringNullableFilter<"Projet"> | string | null
    modelePV?: StringNullableFilter<"Projet"> | string | null
    nbOnduleurs?: IntNullableFilter<"Projet"> | number | null
    puUnitaireOnd?: StringNullableFilter<"Projet"> | string | null
    puOndSiAutreW?: StringNullableFilter<"Projet"> | string | null
    marqueOnd?: StringNullableFilter<"Projet"> | string | null
    modeleOnd?: StringNullableFilter<"Projet"> | string | null
    autreModeleOnd?: StringNullableFilter<"Projet"> | string | null
    equipementSurMesure?: StringNullableFilter<"Projet"> | string | null
    interventionSurMesure?: StringNullableFilter<"Projet"> | string | null
    rapportPuissance?: StringNullableFilter<"Projet"> | string | null
    dateDepotDossier?: DateTimeNullableFilter<"Projet"> | Date | string | null
    dateApprobation?: DateTimeNullableFilter<"Projet"> | Date | string | null
    dateInstallation?: DateTimeNullableFilter<"Projet"> | Date | string | null
    dateDepotDemandeMES?: DateTimeNullableFilter<"Projet"> | Date | string | null
    datePaiementPoseCompteurProsol?: DateTimeNullableFilter<"Projet"> | Date | string | null
    dateMES?: DateTimeNullableFilter<"Projet"> | Date | string | null
    nPolice?: StringNullableFilter<"Projet"> | string | null
    nLotDebProsol?: StringNullableFilter<"Projet"> | string | null
    saisieProsol?: StringNullableFilter<"Projet"> | string | null
    nLotDeblocageSubvention?: StringNullableFilter<"Projet"> | string | null
    deblocageProsol?: StringNullableFilter<"Projet"> | string | null
    conditionSubvention?: StringNullableFilter<"Projet"> | string | null
    saisieSubvention?: StringNullableFilter<"Projet"> | string | null
    deblocageSubvention?: StringNullableFilter<"Projet"> | string | null
    nDevis?: StringNullableFilter<"Projet"> | string | null
    dateDevis?: DateTimeNullableFilter<"Projet"> | Date | string | null
    nFacture?: StringNullableFilter<"Projet"> | string | null
    dateFacture?: DateTimeNullableFilter<"Projet"> | Date | string | null
    montantHT?: StringNullableFilter<"Projet"> | string | null
    tva?: StringNullableFilter<"Projet"> | string | null
    montantTTC?: StringNullableFilter<"Projet"> | string | null
    montantTTCFinal?: StringNullableFilter<"Projet"> | string | null
    montantAutofinancement?: StringNullableFilter<"Projet"> | string | null
    fraisPoseCmptProsol?: StringNullableFilter<"Projet"> | string | null
    paiement1erFactureSTEG?: StringNullableFilter<"Projet"> | string | null
    paiement2emeFactureSTEG?: StringNullableFilter<"Projet"> | string | null
    fraisAugmentationCalibre?: StringNullableFilter<"Projet"> | string | null
    fraisMutationElec?: StringNullableFilter<"Projet"> | string | null
    fraisMutationGaz?: StringNullableFilter<"Projet"> | string | null
    fraisPassageMonoTri?: StringNullableFilter<"Projet"> | string | null
    autresFrais?: StringNullableFilter<"Projet"> | string | null
    reglementClient?: StringNullableFilter<"Projet"> | string | null
    resteAPayer?: StringNullableFilter<"Projet"> | string | null
    subventionDemandee?: StringNullableFilter<"Projet"> | string | null
    createdAt?: DateTimeFilter<"Projet"> | Date | string
    updatedAt?: DateTimeFilter<"Projet"> | Date | string
    agentCommercial?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    echeances?: EcheanceListRelationFilter
    logs?: ActionLogListRelationFilter
  }

  export type ProjetOrderByWithRelationInput = {
    id?: SortOrder
    codeBarres?: SortOrder
    reference?: SortOrder
    abonnes?: SortOrder
    email?: SortOrder
    cin?: SortOrder
    contact?: SortOrder
    coordonneesGps?: SortOrder
    adresseLieuImplantation?: SortOrder
    presenteParMF?: SortOrder
    district?: SortOrder
    gouvernorat?: SortOrder
    delegation?: SortOrder
    municipalite?: SortOrder
    typeProjet?: SortOrder
    etatDossier?: SortOrder
    classementDossier?: SortOrder
    commentaire?: SortOrder
    approbationCommerciale?: SortOrder
    approbationTechnique?: SortOrder
    executionInstallation?: SortOrder
    reception?: SortOrder
    procesVerbal?: SortOrder
    contratAchat?: SortOrder
    montantFinancement?: SortOrder
    tauxInteret?: SortOrder
    banque?: SortOrder
    agentCommercialId?: SortOrder
    agentCommercialAutre?: SortOrder
    puissanceInstallee?: SortOrder
    typeCompteur?: SortOrder
    numeroCompteur?: SortOrder
    calibreDisjoncteur?: SortOrder
    puissanceSouscrite?: SortOrder
    productionPrevisionnelle?: SortOrder
    consommationAnnuelle?: SortOrder
    nbModules?: SortOrder
    puUnitairePV?: SortOrder
    marquePV?: SortOrder
    modelePV?: SortOrder
    nbOnduleurs?: SortOrder
    puUnitaireOnd?: SortOrder
    puOndSiAutreW?: SortOrder
    marqueOnd?: SortOrder
    modeleOnd?: SortOrder
    autreModeleOnd?: SortOrder
    equipementSurMesure?: SortOrder
    interventionSurMesure?: SortOrder
    rapportPuissance?: SortOrder
    dateDepotDossier?: SortOrder
    dateApprobation?: SortOrder
    dateInstallation?: SortOrder
    dateDepotDemandeMES?: SortOrder
    datePaiementPoseCompteurProsol?: SortOrder
    dateMES?: SortOrder
    nPolice?: SortOrder
    nLotDebProsol?: SortOrder
    saisieProsol?: SortOrder
    nLotDeblocageSubvention?: SortOrder
    deblocageProsol?: SortOrder
    conditionSubvention?: SortOrder
    saisieSubvention?: SortOrder
    deblocageSubvention?: SortOrder
    nDevis?: SortOrder
    dateDevis?: SortOrder
    nFacture?: SortOrder
    dateFacture?: SortOrder
    montantHT?: SortOrder
    tva?: SortOrder
    montantTTC?: SortOrder
    montantTTCFinal?: SortOrder
    montantAutofinancement?: SortOrder
    fraisPoseCmptProsol?: SortOrder
    paiement1erFactureSTEG?: SortOrder
    paiement2emeFactureSTEG?: SortOrder
    fraisAugmentationCalibre?: SortOrder
    fraisMutationElec?: SortOrder
    fraisMutationGaz?: SortOrder
    fraisPassageMonoTri?: SortOrder
    autresFrais?: SortOrder
    reglementClient?: SortOrder
    resteAPayer?: SortOrder
    subventionDemandee?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    agentCommercial?: UserOrderByWithRelationInput
    echeances?: EcheanceOrderByRelationAggregateInput
    logs?: ActionLogOrderByRelationAggregateInput
  }

  export type ProjetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    reference?: string
    AND?: ProjetWhereInput | ProjetWhereInput[]
    OR?: ProjetWhereInput[]
    NOT?: ProjetWhereInput | ProjetWhereInput[]
    codeBarres?: StringNullableFilter<"Projet"> | string | null
    abonnes?: StringFilter<"Projet"> | string
    email?: StringNullableFilter<"Projet"> | string | null
    cin?: StringNullableFilter<"Projet"> | string | null
    contact?: StringNullableFilter<"Projet"> | string | null
    coordonneesGps?: StringNullableFilter<"Projet"> | string | null
    adresseLieuImplantation?: StringNullableFilter<"Projet"> | string | null
    presenteParMF?: StringNullableFilter<"Projet"> | string | null
    district?: StringNullableFilter<"Projet"> | string | null
    gouvernorat?: StringNullableFilter<"Projet"> | string | null
    delegation?: StringNullableFilter<"Projet"> | string | null
    municipalite?: StringNullableFilter<"Projet"> | string | null
    typeProjet?: EnumTypeProjetFilter<"Projet"> | $Enums.TypeProjet
    etatDossier?: EnumEtatDossierFilter<"Projet"> | $Enums.EtatDossier
    classementDossier?: EnumClassementDossierFilter<"Projet"> | $Enums.ClassementDossier
    commentaire?: StringNullableFilter<"Projet"> | string | null
    approbationCommerciale?: EnumStatutApprobationFilter<"Projet"> | $Enums.StatutApprobation
    approbationTechnique?: EnumStatutApprobationFilter<"Projet"> | $Enums.StatutApprobation
    executionInstallation?: StringNullableFilter<"Projet"> | string | null
    reception?: StringNullableFilter<"Projet"> | string | null
    procesVerbal?: StringNullableFilter<"Projet"> | string | null
    contratAchat?: EnumTypeContratNullableFilter<"Projet"> | $Enums.TypeContrat | null
    montantFinancement?: StringNullableFilter<"Projet"> | string | null
    tauxInteret?: StringNullableFilter<"Projet"> | string | null
    banque?: StringNullableFilter<"Projet"> | string | null
    agentCommercialId?: StringNullableFilter<"Projet"> | string | null
    agentCommercialAutre?: StringNullableFilter<"Projet"> | string | null
    puissanceInstallee?: StringNullableFilter<"Projet"> | string | null
    typeCompteur?: EnumTypeCompteurNullableFilter<"Projet"> | $Enums.TypeCompteur | null
    numeroCompteur?: StringNullableFilter<"Projet"> | string | null
    calibreDisjoncteur?: StringNullableFilter<"Projet"> | string | null
    puissanceSouscrite?: StringNullableFilter<"Projet"> | string | null
    productionPrevisionnelle?: StringNullableFilter<"Projet"> | string | null
    consommationAnnuelle?: StringNullableFilter<"Projet"> | string | null
    nbModules?: IntNullableFilter<"Projet"> | number | null
    puUnitairePV?: StringNullableFilter<"Projet"> | string | null
    marquePV?: StringNullableFilter<"Projet"> | string | null
    modelePV?: StringNullableFilter<"Projet"> | string | null
    nbOnduleurs?: IntNullableFilter<"Projet"> | number | null
    puUnitaireOnd?: StringNullableFilter<"Projet"> | string | null
    puOndSiAutreW?: StringNullableFilter<"Projet"> | string | null
    marqueOnd?: StringNullableFilter<"Projet"> | string | null
    modeleOnd?: StringNullableFilter<"Projet"> | string | null
    autreModeleOnd?: StringNullableFilter<"Projet"> | string | null
    equipementSurMesure?: StringNullableFilter<"Projet"> | string | null
    interventionSurMesure?: StringNullableFilter<"Projet"> | string | null
    rapportPuissance?: StringNullableFilter<"Projet"> | string | null
    dateDepotDossier?: DateTimeNullableFilter<"Projet"> | Date | string | null
    dateApprobation?: DateTimeNullableFilter<"Projet"> | Date | string | null
    dateInstallation?: DateTimeNullableFilter<"Projet"> | Date | string | null
    dateDepotDemandeMES?: DateTimeNullableFilter<"Projet"> | Date | string | null
    datePaiementPoseCompteurProsol?: DateTimeNullableFilter<"Projet"> | Date | string | null
    dateMES?: DateTimeNullableFilter<"Projet"> | Date | string | null
    nPolice?: StringNullableFilter<"Projet"> | string | null
    nLotDebProsol?: StringNullableFilter<"Projet"> | string | null
    saisieProsol?: StringNullableFilter<"Projet"> | string | null
    nLotDeblocageSubvention?: StringNullableFilter<"Projet"> | string | null
    deblocageProsol?: StringNullableFilter<"Projet"> | string | null
    conditionSubvention?: StringNullableFilter<"Projet"> | string | null
    saisieSubvention?: StringNullableFilter<"Projet"> | string | null
    deblocageSubvention?: StringNullableFilter<"Projet"> | string | null
    nDevis?: StringNullableFilter<"Projet"> | string | null
    dateDevis?: DateTimeNullableFilter<"Projet"> | Date | string | null
    nFacture?: StringNullableFilter<"Projet"> | string | null
    dateFacture?: DateTimeNullableFilter<"Projet"> | Date | string | null
    montantHT?: StringNullableFilter<"Projet"> | string | null
    tva?: StringNullableFilter<"Projet"> | string | null
    montantTTC?: StringNullableFilter<"Projet"> | string | null
    montantTTCFinal?: StringNullableFilter<"Projet"> | string | null
    montantAutofinancement?: StringNullableFilter<"Projet"> | string | null
    fraisPoseCmptProsol?: StringNullableFilter<"Projet"> | string | null
    paiement1erFactureSTEG?: StringNullableFilter<"Projet"> | string | null
    paiement2emeFactureSTEG?: StringNullableFilter<"Projet"> | string | null
    fraisAugmentationCalibre?: StringNullableFilter<"Projet"> | string | null
    fraisMutationElec?: StringNullableFilter<"Projet"> | string | null
    fraisMutationGaz?: StringNullableFilter<"Projet"> | string | null
    fraisPassageMonoTri?: StringNullableFilter<"Projet"> | string | null
    autresFrais?: StringNullableFilter<"Projet"> | string | null
    reglementClient?: StringNullableFilter<"Projet"> | string | null
    resteAPayer?: StringNullableFilter<"Projet"> | string | null
    subventionDemandee?: StringNullableFilter<"Projet"> | string | null
    createdAt?: DateTimeFilter<"Projet"> | Date | string
    updatedAt?: DateTimeFilter<"Projet"> | Date | string
    agentCommercial?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    echeances?: EcheanceListRelationFilter
    logs?: ActionLogListRelationFilter
  }, "id" | "reference">

  export type ProjetOrderByWithAggregationInput = {
    id?: SortOrder
    codeBarres?: SortOrder
    reference?: SortOrder
    abonnes?: SortOrder
    email?: SortOrder
    cin?: SortOrder
    contact?: SortOrder
    coordonneesGps?: SortOrder
    adresseLieuImplantation?: SortOrder
    presenteParMF?: SortOrder
    district?: SortOrder
    gouvernorat?: SortOrder
    delegation?: SortOrder
    municipalite?: SortOrder
    typeProjet?: SortOrder
    etatDossier?: SortOrder
    classementDossier?: SortOrder
    commentaire?: SortOrder
    approbationCommerciale?: SortOrder
    approbationTechnique?: SortOrder
    executionInstallation?: SortOrder
    reception?: SortOrder
    procesVerbal?: SortOrder
    contratAchat?: SortOrder
    montantFinancement?: SortOrder
    tauxInteret?: SortOrder
    banque?: SortOrder
    agentCommercialId?: SortOrder
    agentCommercialAutre?: SortOrder
    puissanceInstallee?: SortOrder
    typeCompteur?: SortOrder
    numeroCompteur?: SortOrder
    calibreDisjoncteur?: SortOrder
    puissanceSouscrite?: SortOrder
    productionPrevisionnelle?: SortOrder
    consommationAnnuelle?: SortOrder
    nbModules?: SortOrder
    puUnitairePV?: SortOrder
    marquePV?: SortOrder
    modelePV?: SortOrder
    nbOnduleurs?: SortOrder
    puUnitaireOnd?: SortOrder
    puOndSiAutreW?: SortOrder
    marqueOnd?: SortOrder
    modeleOnd?: SortOrder
    autreModeleOnd?: SortOrder
    equipementSurMesure?: SortOrder
    interventionSurMesure?: SortOrder
    rapportPuissance?: SortOrder
    dateDepotDossier?: SortOrder
    dateApprobation?: SortOrder
    dateInstallation?: SortOrder
    dateDepotDemandeMES?: SortOrder
    datePaiementPoseCompteurProsol?: SortOrder
    dateMES?: SortOrder
    nPolice?: SortOrder
    nLotDebProsol?: SortOrder
    saisieProsol?: SortOrder
    nLotDeblocageSubvention?: SortOrder
    deblocageProsol?: SortOrder
    conditionSubvention?: SortOrder
    saisieSubvention?: SortOrder
    deblocageSubvention?: SortOrder
    nDevis?: SortOrder
    dateDevis?: SortOrder
    nFacture?: SortOrder
    dateFacture?: SortOrder
    montantHT?: SortOrder
    tva?: SortOrder
    montantTTC?: SortOrder
    montantTTCFinal?: SortOrder
    montantAutofinancement?: SortOrder
    fraisPoseCmptProsol?: SortOrder
    paiement1erFactureSTEG?: SortOrder
    paiement2emeFactureSTEG?: SortOrder
    fraisAugmentationCalibre?: SortOrder
    fraisMutationElec?: SortOrder
    fraisMutationGaz?: SortOrder
    fraisPassageMonoTri?: SortOrder
    autresFrais?: SortOrder
    reglementClient?: SortOrder
    resteAPayer?: SortOrder
    subventionDemandee?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProjetCountOrderByAggregateInput
    _avg?: ProjetAvgOrderByAggregateInput
    _max?: ProjetMaxOrderByAggregateInput
    _min?: ProjetMinOrderByAggregateInput
    _sum?: ProjetSumOrderByAggregateInput
  }

  export type ProjetScalarWhereWithAggregatesInput = {
    AND?: ProjetScalarWhereWithAggregatesInput | ProjetScalarWhereWithAggregatesInput[]
    OR?: ProjetScalarWhereWithAggregatesInput[]
    NOT?: ProjetScalarWhereWithAggregatesInput | ProjetScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Projet"> | string
    codeBarres?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    reference?: StringWithAggregatesFilter<"Projet"> | string
    abonnes?: StringWithAggregatesFilter<"Projet"> | string
    email?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    cin?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    contact?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    coordonneesGps?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    adresseLieuImplantation?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    presenteParMF?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    district?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    gouvernorat?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    delegation?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    municipalite?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    typeProjet?: EnumTypeProjetWithAggregatesFilter<"Projet"> | $Enums.TypeProjet
    etatDossier?: EnumEtatDossierWithAggregatesFilter<"Projet"> | $Enums.EtatDossier
    classementDossier?: EnumClassementDossierWithAggregatesFilter<"Projet"> | $Enums.ClassementDossier
    commentaire?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    approbationCommerciale?: EnumStatutApprobationWithAggregatesFilter<"Projet"> | $Enums.StatutApprobation
    approbationTechnique?: EnumStatutApprobationWithAggregatesFilter<"Projet"> | $Enums.StatutApprobation
    executionInstallation?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    reception?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    procesVerbal?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    contratAchat?: EnumTypeContratNullableWithAggregatesFilter<"Projet"> | $Enums.TypeContrat | null
    montantFinancement?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    tauxInteret?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    banque?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    agentCommercialId?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    agentCommercialAutre?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    puissanceInstallee?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    typeCompteur?: EnumTypeCompteurNullableWithAggregatesFilter<"Projet"> | $Enums.TypeCompteur | null
    numeroCompteur?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    calibreDisjoncteur?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    puissanceSouscrite?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    productionPrevisionnelle?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    consommationAnnuelle?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    nbModules?: IntNullableWithAggregatesFilter<"Projet"> | number | null
    puUnitairePV?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    marquePV?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    modelePV?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    nbOnduleurs?: IntNullableWithAggregatesFilter<"Projet"> | number | null
    puUnitaireOnd?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    puOndSiAutreW?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    marqueOnd?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    modeleOnd?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    autreModeleOnd?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    equipementSurMesure?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    interventionSurMesure?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    rapportPuissance?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    dateDepotDossier?: DateTimeNullableWithAggregatesFilter<"Projet"> | Date | string | null
    dateApprobation?: DateTimeNullableWithAggregatesFilter<"Projet"> | Date | string | null
    dateInstallation?: DateTimeNullableWithAggregatesFilter<"Projet"> | Date | string | null
    dateDepotDemandeMES?: DateTimeNullableWithAggregatesFilter<"Projet"> | Date | string | null
    datePaiementPoseCompteurProsol?: DateTimeNullableWithAggregatesFilter<"Projet"> | Date | string | null
    dateMES?: DateTimeNullableWithAggregatesFilter<"Projet"> | Date | string | null
    nPolice?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    nLotDebProsol?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    saisieProsol?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    nLotDeblocageSubvention?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    deblocageProsol?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    conditionSubvention?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    saisieSubvention?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    deblocageSubvention?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    nDevis?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    dateDevis?: DateTimeNullableWithAggregatesFilter<"Projet"> | Date | string | null
    nFacture?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    dateFacture?: DateTimeNullableWithAggregatesFilter<"Projet"> | Date | string | null
    montantHT?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    tva?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    montantTTC?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    montantTTCFinal?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    montantAutofinancement?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    fraisPoseCmptProsol?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    paiement1erFactureSTEG?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    paiement2emeFactureSTEG?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    fraisAugmentationCalibre?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    fraisMutationElec?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    fraisMutationGaz?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    fraisPassageMonoTri?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    autresFrais?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    reglementClient?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    resteAPayer?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    subventionDemandee?: StringNullableWithAggregatesFilter<"Projet"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Projet"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Projet"> | Date | string
  }

  export type EcheanceWhereInput = {
    AND?: EcheanceWhereInput | EcheanceWhereInput[]
    OR?: EcheanceWhereInput[]
    NOT?: EcheanceWhereInput | EcheanceWhereInput[]
    id?: StringFilter<"Echeance"> | string
    projetId?: StringFilter<"Echeance"> | string
    numero?: IntFilter<"Echeance"> | number
    montant?: StringNullableFilter<"Echeance"> | string | null
    date?: DateTimeNullableFilter<"Echeance"> | Date | string | null
    modePaiement?: StringNullableFilter<"Echeance"> | string | null
    description?: StringNullableFilter<"Echeance"> | string | null
    projet?: XOR<ProjetScalarRelationFilter, ProjetWhereInput>
  }

  export type EcheanceOrderByWithRelationInput = {
    id?: SortOrder
    projetId?: SortOrder
    numero?: SortOrder
    montant?: SortOrder
    date?: SortOrder
    modePaiement?: SortOrder
    description?: SortOrder
    projet?: ProjetOrderByWithRelationInput
  }

  export type EcheanceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    projetId_numero?: EcheanceProjetIdNumeroCompoundUniqueInput
    AND?: EcheanceWhereInput | EcheanceWhereInput[]
    OR?: EcheanceWhereInput[]
    NOT?: EcheanceWhereInput | EcheanceWhereInput[]
    projetId?: StringFilter<"Echeance"> | string
    numero?: IntFilter<"Echeance"> | number
    montant?: StringNullableFilter<"Echeance"> | string | null
    date?: DateTimeNullableFilter<"Echeance"> | Date | string | null
    modePaiement?: StringNullableFilter<"Echeance"> | string | null
    description?: StringNullableFilter<"Echeance"> | string | null
    projet?: XOR<ProjetScalarRelationFilter, ProjetWhereInput>
  }, "id" | "projetId_numero">

  export type EcheanceOrderByWithAggregationInput = {
    id?: SortOrder
    projetId?: SortOrder
    numero?: SortOrder
    montant?: SortOrder
    date?: SortOrder
    modePaiement?: SortOrder
    description?: SortOrder
    _count?: EcheanceCountOrderByAggregateInput
    _avg?: EcheanceAvgOrderByAggregateInput
    _max?: EcheanceMaxOrderByAggregateInput
    _min?: EcheanceMinOrderByAggregateInput
    _sum?: EcheanceSumOrderByAggregateInput
  }

  export type EcheanceScalarWhereWithAggregatesInput = {
    AND?: EcheanceScalarWhereWithAggregatesInput | EcheanceScalarWhereWithAggregatesInput[]
    OR?: EcheanceScalarWhereWithAggregatesInput[]
    NOT?: EcheanceScalarWhereWithAggregatesInput | EcheanceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Echeance"> | string
    projetId?: StringWithAggregatesFilter<"Echeance"> | string
    numero?: IntWithAggregatesFilter<"Echeance"> | number
    montant?: StringNullableWithAggregatesFilter<"Echeance"> | string | null
    date?: DateTimeNullableWithAggregatesFilter<"Echeance"> | Date | string | null
    modePaiement?: StringNullableWithAggregatesFilter<"Echeance"> | string | null
    description?: StringNullableWithAggregatesFilter<"Echeance"> | string | null
  }

  export type ActionLogWhereInput = {
    AND?: ActionLogWhereInput | ActionLogWhereInput[]
    OR?: ActionLogWhereInput[]
    NOT?: ActionLogWhereInput | ActionLogWhereInput[]
    id?: StringFilter<"ActionLog"> | string
    userId?: StringFilter<"ActionLog"> | string
    projetId?: StringNullableFilter<"ActionLog"> | string | null
    action?: StringFilter<"ActionLog"> | string
    details?: JsonNullableFilter<"ActionLog">
    createdAt?: DateTimeFilter<"ActionLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    projet?: XOR<ProjetNullableScalarRelationFilter, ProjetWhereInput> | null
  }

  export type ActionLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    projetId?: SortOrder
    action?: SortOrder
    details?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    projet?: ProjetOrderByWithRelationInput
  }

  export type ActionLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ActionLogWhereInput | ActionLogWhereInput[]
    OR?: ActionLogWhereInput[]
    NOT?: ActionLogWhereInput | ActionLogWhereInput[]
    userId?: StringFilter<"ActionLog"> | string
    projetId?: StringNullableFilter<"ActionLog"> | string | null
    action?: StringFilter<"ActionLog"> | string
    details?: JsonNullableFilter<"ActionLog">
    createdAt?: DateTimeFilter<"ActionLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    projet?: XOR<ProjetNullableScalarRelationFilter, ProjetWhereInput> | null
  }, "id">

  export type ActionLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    projetId?: SortOrder
    action?: SortOrder
    details?: SortOrder
    createdAt?: SortOrder
    _count?: ActionLogCountOrderByAggregateInput
    _max?: ActionLogMaxOrderByAggregateInput
    _min?: ActionLogMinOrderByAggregateInput
  }

  export type ActionLogScalarWhereWithAggregatesInput = {
    AND?: ActionLogScalarWhereWithAggregatesInput | ActionLogScalarWhereWithAggregatesInput[]
    OR?: ActionLogScalarWhereWithAggregatesInput[]
    NOT?: ActionLogScalarWhereWithAggregatesInput | ActionLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ActionLog"> | string
    userId?: StringWithAggregatesFilter<"ActionLog"> | string
    projetId?: StringNullableWithAggregatesFilter<"ActionLog"> | string | null
    action?: StringWithAggregatesFilter<"ActionLog"> | string
    details?: JsonNullableWithAggregatesFilter<"ActionLog">
    createdAt?: DateTimeWithAggregatesFilter<"ActionLog"> | Date | string
  }

  export type SocieteWhereInput = {
    AND?: SocieteWhereInput | SocieteWhereInput[]
    OR?: SocieteWhereInput[]
    NOT?: SocieteWhereInput | SocieteWhereInput[]
    id?: StringFilter<"Societe"> | string
    code?: StringFilter<"Societe"> | string
    denomination?: StringFilter<"Societe"> | string
    nomCommercial?: StringFilter<"Societe"> | string
    adresseSiegeSocial?: StringFilter<"Societe"> | string
    adresseActivite?: StringFilter<"Societe"> | string
    formeJuridique?: StringFilter<"Societe"> | string
    mf?: StringFilter<"Societe"> | string
    capitalSocial?: StringFilter<"Societe"> | string
    contactFixe?: StringFilter<"Societe"> | string
    contactFax?: StringFilter<"Societe"> | string
    contactMobile?: StringFilter<"Societe"> | string
    adresseEmail?: StringFilter<"Societe"> | string
    rib?: StringFilter<"Societe"> | string
    banque?: StringFilter<"Societe"> | string
    codeSteg?: StringFilter<"Societe"> | string
    codeAnme?: StringFilter<"Societe"> | string
    validiteAnme?: StringFilter<"Societe"> | string
    gerant?: StringFilter<"Societe"> | string
    pdfLogoDataUrl?: StringFilter<"Societe"> | string
    createdAt?: DateTimeFilter<"Societe"> | Date | string
    updatedAt?: DateTimeFilter<"Societe"> | Date | string
  }

  export type SocieteOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    denomination?: SortOrder
    nomCommercial?: SortOrder
    adresseSiegeSocial?: SortOrder
    adresseActivite?: SortOrder
    formeJuridique?: SortOrder
    mf?: SortOrder
    capitalSocial?: SortOrder
    contactFixe?: SortOrder
    contactFax?: SortOrder
    contactMobile?: SortOrder
    adresseEmail?: SortOrder
    rib?: SortOrder
    banque?: SortOrder
    codeSteg?: SortOrder
    codeAnme?: SortOrder
    validiteAnme?: SortOrder
    gerant?: SortOrder
    pdfLogoDataUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SocieteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: SocieteWhereInput | SocieteWhereInput[]
    OR?: SocieteWhereInput[]
    NOT?: SocieteWhereInput | SocieteWhereInput[]
    denomination?: StringFilter<"Societe"> | string
    nomCommercial?: StringFilter<"Societe"> | string
    adresseSiegeSocial?: StringFilter<"Societe"> | string
    adresseActivite?: StringFilter<"Societe"> | string
    formeJuridique?: StringFilter<"Societe"> | string
    mf?: StringFilter<"Societe"> | string
    capitalSocial?: StringFilter<"Societe"> | string
    contactFixe?: StringFilter<"Societe"> | string
    contactFax?: StringFilter<"Societe"> | string
    contactMobile?: StringFilter<"Societe"> | string
    adresseEmail?: StringFilter<"Societe"> | string
    rib?: StringFilter<"Societe"> | string
    banque?: StringFilter<"Societe"> | string
    codeSteg?: StringFilter<"Societe"> | string
    codeAnme?: StringFilter<"Societe"> | string
    validiteAnme?: StringFilter<"Societe"> | string
    gerant?: StringFilter<"Societe"> | string
    pdfLogoDataUrl?: StringFilter<"Societe"> | string
    createdAt?: DateTimeFilter<"Societe"> | Date | string
    updatedAt?: DateTimeFilter<"Societe"> | Date | string
  }, "id" | "code">

  export type SocieteOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    denomination?: SortOrder
    nomCommercial?: SortOrder
    adresseSiegeSocial?: SortOrder
    adresseActivite?: SortOrder
    formeJuridique?: SortOrder
    mf?: SortOrder
    capitalSocial?: SortOrder
    contactFixe?: SortOrder
    contactFax?: SortOrder
    contactMobile?: SortOrder
    adresseEmail?: SortOrder
    rib?: SortOrder
    banque?: SortOrder
    codeSteg?: SortOrder
    codeAnme?: SortOrder
    validiteAnme?: SortOrder
    gerant?: SortOrder
    pdfLogoDataUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SocieteCountOrderByAggregateInput
    _max?: SocieteMaxOrderByAggregateInput
    _min?: SocieteMinOrderByAggregateInput
  }

  export type SocieteScalarWhereWithAggregatesInput = {
    AND?: SocieteScalarWhereWithAggregatesInput | SocieteScalarWhereWithAggregatesInput[]
    OR?: SocieteScalarWhereWithAggregatesInput[]
    NOT?: SocieteScalarWhereWithAggregatesInput | SocieteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Societe"> | string
    code?: StringWithAggregatesFilter<"Societe"> | string
    denomination?: StringWithAggregatesFilter<"Societe"> | string
    nomCommercial?: StringWithAggregatesFilter<"Societe"> | string
    adresseSiegeSocial?: StringWithAggregatesFilter<"Societe"> | string
    adresseActivite?: StringWithAggregatesFilter<"Societe"> | string
    formeJuridique?: StringWithAggregatesFilter<"Societe"> | string
    mf?: StringWithAggregatesFilter<"Societe"> | string
    capitalSocial?: StringWithAggregatesFilter<"Societe"> | string
    contactFixe?: StringWithAggregatesFilter<"Societe"> | string
    contactFax?: StringWithAggregatesFilter<"Societe"> | string
    contactMobile?: StringWithAggregatesFilter<"Societe"> | string
    adresseEmail?: StringWithAggregatesFilter<"Societe"> | string
    rib?: StringWithAggregatesFilter<"Societe"> | string
    banque?: StringWithAggregatesFilter<"Societe"> | string
    codeSteg?: StringWithAggregatesFilter<"Societe"> | string
    codeAnme?: StringWithAggregatesFilter<"Societe"> | string
    validiteAnme?: StringWithAggregatesFilter<"Societe"> | string
    gerant?: StringWithAggregatesFilter<"Societe"> | string
    pdfLogoDataUrl?: StringWithAggregatesFilter<"Societe"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Societe"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Societe"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    nom: string
    prenom: string
    email: string
    telephone?: string | null
    password: string
    role?: $Enums.Role
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    lastLoginAt?: Date | string | null
    sessions?: SessionCreateNestedManyWithoutUserInput
    projets?: ProjetCreateNestedManyWithoutAgentCommercialInput
    logs?: ActionLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    nom: string
    prenom: string
    email: string
    telephone?: string | null
    password: string
    role?: $Enums.Role
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    lastLoginAt?: Date | string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    projets?: ProjetUncheckedCreateNestedManyWithoutAgentCommercialInput
    logs?: ActionLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUpdateManyWithoutUserNestedInput
    projets?: ProjetUpdateManyWithoutAgentCommercialNestedInput
    logs?: ActionLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    projets?: ProjetUncheckedUpdateManyWithoutAgentCommercialNestedInput
    logs?: ActionLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    nom: string
    prenom: string
    email: string
    telephone?: string | null
    password: string
    role?: $Enums.Role
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    lastLoginAt?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SessionCreateInput = {
    id?: string
    refreshToken: string
    expiresAt: Date | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    userId: string
    refreshToken: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type SessionUpdateInput = {
    refreshToken?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    userId: string
    refreshToken: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    refreshToken?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjetCreateInput = {
    id?: string
    codeBarres?: string | null
    reference: string
    abonnes: string
    email?: string | null
    cin?: string | null
    contact?: string | null
    coordonneesGps?: string | null
    adresseLieuImplantation?: string | null
    presenteParMF?: string | null
    district?: string | null
    gouvernorat?: string | null
    delegation?: string | null
    municipalite?: string | null
    typeProjet?: $Enums.TypeProjet
    etatDossier?: $Enums.EtatDossier
    classementDossier?: $Enums.ClassementDossier
    commentaire?: string | null
    approbationCommerciale?: $Enums.StatutApprobation
    approbationTechnique?: $Enums.StatutApprobation
    executionInstallation?: string | null
    reception?: string | null
    procesVerbal?: string | null
    contratAchat?: $Enums.TypeContrat | null
    montantFinancement?: string | null
    tauxInteret?: string | null
    banque?: string | null
    agentCommercialAutre?: string | null
    puissanceInstallee?: string | null
    typeCompteur?: $Enums.TypeCompteur | null
    numeroCompteur?: string | null
    calibreDisjoncteur?: string | null
    puissanceSouscrite?: string | null
    productionPrevisionnelle?: string | null
    consommationAnnuelle?: string | null
    nbModules?: number | null
    puUnitairePV?: string | null
    marquePV?: string | null
    modelePV?: string | null
    nbOnduleurs?: number | null
    puUnitaireOnd?: string | null
    puOndSiAutreW?: string | null
    marqueOnd?: string | null
    modeleOnd?: string | null
    autreModeleOnd?: string | null
    equipementSurMesure?: string | null
    interventionSurMesure?: string | null
    rapportPuissance?: string | null
    dateDepotDossier?: Date | string | null
    dateApprobation?: Date | string | null
    dateInstallation?: Date | string | null
    dateDepotDemandeMES?: Date | string | null
    datePaiementPoseCompteurProsol?: Date | string | null
    dateMES?: Date | string | null
    nPolice?: string | null
    nLotDebProsol?: string | null
    saisieProsol?: string | null
    nLotDeblocageSubvention?: string | null
    deblocageProsol?: string | null
    conditionSubvention?: string | null
    saisieSubvention?: string | null
    deblocageSubvention?: string | null
    nDevis?: string | null
    dateDevis?: Date | string | null
    nFacture?: string | null
    dateFacture?: Date | string | null
    montantHT?: string | null
    tva?: string | null
    montantTTC?: string | null
    montantTTCFinal?: string | null
    montantAutofinancement?: string | null
    fraisPoseCmptProsol?: string | null
    paiement1erFactureSTEG?: string | null
    paiement2emeFactureSTEG?: string | null
    fraisAugmentationCalibre?: string | null
    fraisMutationElec?: string | null
    fraisMutationGaz?: string | null
    fraisPassageMonoTri?: string | null
    autresFrais?: string | null
    reglementClient?: string | null
    resteAPayer?: string | null
    subventionDemandee?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    agentCommercial?: UserCreateNestedOneWithoutProjetsInput
    echeances?: EcheanceCreateNestedManyWithoutProjetInput
    logs?: ActionLogCreateNestedManyWithoutProjetInput
  }

  export type ProjetUncheckedCreateInput = {
    id?: string
    codeBarres?: string | null
    reference: string
    abonnes: string
    email?: string | null
    cin?: string | null
    contact?: string | null
    coordonneesGps?: string | null
    adresseLieuImplantation?: string | null
    presenteParMF?: string | null
    district?: string | null
    gouvernorat?: string | null
    delegation?: string | null
    municipalite?: string | null
    typeProjet?: $Enums.TypeProjet
    etatDossier?: $Enums.EtatDossier
    classementDossier?: $Enums.ClassementDossier
    commentaire?: string | null
    approbationCommerciale?: $Enums.StatutApprobation
    approbationTechnique?: $Enums.StatutApprobation
    executionInstallation?: string | null
    reception?: string | null
    procesVerbal?: string | null
    contratAchat?: $Enums.TypeContrat | null
    montantFinancement?: string | null
    tauxInteret?: string | null
    banque?: string | null
    agentCommercialId?: string | null
    agentCommercialAutre?: string | null
    puissanceInstallee?: string | null
    typeCompteur?: $Enums.TypeCompteur | null
    numeroCompteur?: string | null
    calibreDisjoncteur?: string | null
    puissanceSouscrite?: string | null
    productionPrevisionnelle?: string | null
    consommationAnnuelle?: string | null
    nbModules?: number | null
    puUnitairePV?: string | null
    marquePV?: string | null
    modelePV?: string | null
    nbOnduleurs?: number | null
    puUnitaireOnd?: string | null
    puOndSiAutreW?: string | null
    marqueOnd?: string | null
    modeleOnd?: string | null
    autreModeleOnd?: string | null
    equipementSurMesure?: string | null
    interventionSurMesure?: string | null
    rapportPuissance?: string | null
    dateDepotDossier?: Date | string | null
    dateApprobation?: Date | string | null
    dateInstallation?: Date | string | null
    dateDepotDemandeMES?: Date | string | null
    datePaiementPoseCompteurProsol?: Date | string | null
    dateMES?: Date | string | null
    nPolice?: string | null
    nLotDebProsol?: string | null
    saisieProsol?: string | null
    nLotDeblocageSubvention?: string | null
    deblocageProsol?: string | null
    conditionSubvention?: string | null
    saisieSubvention?: string | null
    deblocageSubvention?: string | null
    nDevis?: string | null
    dateDevis?: Date | string | null
    nFacture?: string | null
    dateFacture?: Date | string | null
    montantHT?: string | null
    tva?: string | null
    montantTTC?: string | null
    montantTTCFinal?: string | null
    montantAutofinancement?: string | null
    fraisPoseCmptProsol?: string | null
    paiement1erFactureSTEG?: string | null
    paiement2emeFactureSTEG?: string | null
    fraisAugmentationCalibre?: string | null
    fraisMutationElec?: string | null
    fraisMutationGaz?: string | null
    fraisPassageMonoTri?: string | null
    autresFrais?: string | null
    reglementClient?: string | null
    resteAPayer?: string | null
    subventionDemandee?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    echeances?: EcheanceUncheckedCreateNestedManyWithoutProjetInput
    logs?: ActionLogUncheckedCreateNestedManyWithoutProjetInput
  }

  export type ProjetUpdateInput = {
    codeBarres?: NullableStringFieldUpdateOperationsInput | string | null
    reference?: StringFieldUpdateOperationsInput | string
    abonnes?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    cin?: NullableStringFieldUpdateOperationsInput | string | null
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    coordonneesGps?: NullableStringFieldUpdateOperationsInput | string | null
    adresseLieuImplantation?: NullableStringFieldUpdateOperationsInput | string | null
    presenteParMF?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    gouvernorat?: NullableStringFieldUpdateOperationsInput | string | null
    delegation?: NullableStringFieldUpdateOperationsInput | string | null
    municipalite?: NullableStringFieldUpdateOperationsInput | string | null
    typeProjet?: EnumTypeProjetFieldUpdateOperationsInput | $Enums.TypeProjet
    etatDossier?: EnumEtatDossierFieldUpdateOperationsInput | $Enums.EtatDossier
    classementDossier?: EnumClassementDossierFieldUpdateOperationsInput | $Enums.ClassementDossier
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    approbationCommerciale?: EnumStatutApprobationFieldUpdateOperationsInput | $Enums.StatutApprobation
    approbationTechnique?: EnumStatutApprobationFieldUpdateOperationsInput | $Enums.StatutApprobation
    executionInstallation?: NullableStringFieldUpdateOperationsInput | string | null
    reception?: NullableStringFieldUpdateOperationsInput | string | null
    procesVerbal?: NullableStringFieldUpdateOperationsInput | string | null
    contratAchat?: NullableEnumTypeContratFieldUpdateOperationsInput | $Enums.TypeContrat | null
    montantFinancement?: NullableStringFieldUpdateOperationsInput | string | null
    tauxInteret?: NullableStringFieldUpdateOperationsInput | string | null
    banque?: NullableStringFieldUpdateOperationsInput | string | null
    agentCommercialAutre?: NullableStringFieldUpdateOperationsInput | string | null
    puissanceInstallee?: NullableStringFieldUpdateOperationsInput | string | null
    typeCompteur?: NullableEnumTypeCompteurFieldUpdateOperationsInput | $Enums.TypeCompteur | null
    numeroCompteur?: NullableStringFieldUpdateOperationsInput | string | null
    calibreDisjoncteur?: NullableStringFieldUpdateOperationsInput | string | null
    puissanceSouscrite?: NullableStringFieldUpdateOperationsInput | string | null
    productionPrevisionnelle?: NullableStringFieldUpdateOperationsInput | string | null
    consommationAnnuelle?: NullableStringFieldUpdateOperationsInput | string | null
    nbModules?: NullableIntFieldUpdateOperationsInput | number | null
    puUnitairePV?: NullableStringFieldUpdateOperationsInput | string | null
    marquePV?: NullableStringFieldUpdateOperationsInput | string | null
    modelePV?: NullableStringFieldUpdateOperationsInput | string | null
    nbOnduleurs?: NullableIntFieldUpdateOperationsInput | number | null
    puUnitaireOnd?: NullableStringFieldUpdateOperationsInput | string | null
    puOndSiAutreW?: NullableStringFieldUpdateOperationsInput | string | null
    marqueOnd?: NullableStringFieldUpdateOperationsInput | string | null
    modeleOnd?: NullableStringFieldUpdateOperationsInput | string | null
    autreModeleOnd?: NullableStringFieldUpdateOperationsInput | string | null
    equipementSurMesure?: NullableStringFieldUpdateOperationsInput | string | null
    interventionSurMesure?: NullableStringFieldUpdateOperationsInput | string | null
    rapportPuissance?: NullableStringFieldUpdateOperationsInput | string | null
    dateDepotDossier?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateApprobation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateInstallation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateDepotDemandeMES?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    datePaiementPoseCompteurProsol?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateMES?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nPolice?: NullableStringFieldUpdateOperationsInput | string | null
    nLotDebProsol?: NullableStringFieldUpdateOperationsInput | string | null
    saisieProsol?: NullableStringFieldUpdateOperationsInput | string | null
    nLotDeblocageSubvention?: NullableStringFieldUpdateOperationsInput | string | null
    deblocageProsol?: NullableStringFieldUpdateOperationsInput | string | null
    conditionSubvention?: NullableStringFieldUpdateOperationsInput | string | null
    saisieSubvention?: NullableStringFieldUpdateOperationsInput | string | null
    deblocageSubvention?: NullableStringFieldUpdateOperationsInput | string | null
    nDevis?: NullableStringFieldUpdateOperationsInput | string | null
    dateDevis?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nFacture?: NullableStringFieldUpdateOperationsInput | string | null
    dateFacture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    montantHT?: NullableStringFieldUpdateOperationsInput | string | null
    tva?: NullableStringFieldUpdateOperationsInput | string | null
    montantTTC?: NullableStringFieldUpdateOperationsInput | string | null
    montantTTCFinal?: NullableStringFieldUpdateOperationsInput | string | null
    montantAutofinancement?: NullableStringFieldUpdateOperationsInput | string | null
    fraisPoseCmptProsol?: NullableStringFieldUpdateOperationsInput | string | null
    paiement1erFactureSTEG?: NullableStringFieldUpdateOperationsInput | string | null
    paiement2emeFactureSTEG?: NullableStringFieldUpdateOperationsInput | string | null
    fraisAugmentationCalibre?: NullableStringFieldUpdateOperationsInput | string | null
    fraisMutationElec?: NullableStringFieldUpdateOperationsInput | string | null
    fraisMutationGaz?: NullableStringFieldUpdateOperationsInput | string | null
    fraisPassageMonoTri?: NullableStringFieldUpdateOperationsInput | string | null
    autresFrais?: NullableStringFieldUpdateOperationsInput | string | null
    reglementClient?: NullableStringFieldUpdateOperationsInput | string | null
    resteAPayer?: NullableStringFieldUpdateOperationsInput | string | null
    subventionDemandee?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agentCommercial?: UserUpdateOneWithoutProjetsNestedInput
    echeances?: EcheanceUpdateManyWithoutProjetNestedInput
    logs?: ActionLogUpdateManyWithoutProjetNestedInput
  }

  export type ProjetUncheckedUpdateInput = {
    codeBarres?: NullableStringFieldUpdateOperationsInput | string | null
    reference?: StringFieldUpdateOperationsInput | string
    abonnes?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    cin?: NullableStringFieldUpdateOperationsInput | string | null
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    coordonneesGps?: NullableStringFieldUpdateOperationsInput | string | null
    adresseLieuImplantation?: NullableStringFieldUpdateOperationsInput | string | null
    presenteParMF?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    gouvernorat?: NullableStringFieldUpdateOperationsInput | string | null
    delegation?: NullableStringFieldUpdateOperationsInput | string | null
    municipalite?: NullableStringFieldUpdateOperationsInput | string | null
    typeProjet?: EnumTypeProjetFieldUpdateOperationsInput | $Enums.TypeProjet
    etatDossier?: EnumEtatDossierFieldUpdateOperationsInput | $Enums.EtatDossier
    classementDossier?: EnumClassementDossierFieldUpdateOperationsInput | $Enums.ClassementDossier
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    approbationCommerciale?: EnumStatutApprobationFieldUpdateOperationsInput | $Enums.StatutApprobation
    approbationTechnique?: EnumStatutApprobationFieldUpdateOperationsInput | $Enums.StatutApprobation
    executionInstallation?: NullableStringFieldUpdateOperationsInput | string | null
    reception?: NullableStringFieldUpdateOperationsInput | string | null
    procesVerbal?: NullableStringFieldUpdateOperationsInput | string | null
    contratAchat?: NullableEnumTypeContratFieldUpdateOperationsInput | $Enums.TypeContrat | null
    montantFinancement?: NullableStringFieldUpdateOperationsInput | string | null
    tauxInteret?: NullableStringFieldUpdateOperationsInput | string | null
    banque?: NullableStringFieldUpdateOperationsInput | string | null
    agentCommercialId?: NullableStringFieldUpdateOperationsInput | string | null
    agentCommercialAutre?: NullableStringFieldUpdateOperationsInput | string | null
    puissanceInstallee?: NullableStringFieldUpdateOperationsInput | string | null
    typeCompteur?: NullableEnumTypeCompteurFieldUpdateOperationsInput | $Enums.TypeCompteur | null
    numeroCompteur?: NullableStringFieldUpdateOperationsInput | string | null
    calibreDisjoncteur?: NullableStringFieldUpdateOperationsInput | string | null
    puissanceSouscrite?: NullableStringFieldUpdateOperationsInput | string | null
    productionPrevisionnelle?: NullableStringFieldUpdateOperationsInput | string | null
    consommationAnnuelle?: NullableStringFieldUpdateOperationsInput | string | null
    nbModules?: NullableIntFieldUpdateOperationsInput | number | null
    puUnitairePV?: NullableStringFieldUpdateOperationsInput | string | null
    marquePV?: NullableStringFieldUpdateOperationsInput | string | null
    modelePV?: NullableStringFieldUpdateOperationsInput | string | null
    nbOnduleurs?: NullableIntFieldUpdateOperationsInput | number | null
    puUnitaireOnd?: NullableStringFieldUpdateOperationsInput | string | null
    puOndSiAutreW?: NullableStringFieldUpdateOperationsInput | string | null
    marqueOnd?: NullableStringFieldUpdateOperationsInput | string | null
    modeleOnd?: NullableStringFieldUpdateOperationsInput | string | null
    autreModeleOnd?: NullableStringFieldUpdateOperationsInput | string | null
    equipementSurMesure?: NullableStringFieldUpdateOperationsInput | string | null
    interventionSurMesure?: NullableStringFieldUpdateOperationsInput | string | null
    rapportPuissance?: NullableStringFieldUpdateOperationsInput | string | null
    dateDepotDossier?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateApprobation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateInstallation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateDepotDemandeMES?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    datePaiementPoseCompteurProsol?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateMES?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nPolice?: NullableStringFieldUpdateOperationsInput | string | null
    nLotDebProsol?: NullableStringFieldUpdateOperationsInput | string | null
    saisieProsol?: NullableStringFieldUpdateOperationsInput | string | null
    nLotDeblocageSubvention?: NullableStringFieldUpdateOperationsInput | string | null
    deblocageProsol?: NullableStringFieldUpdateOperationsInput | string | null
    conditionSubvention?: NullableStringFieldUpdateOperationsInput | string | null
    saisieSubvention?: NullableStringFieldUpdateOperationsInput | string | null
    deblocageSubvention?: NullableStringFieldUpdateOperationsInput | string | null
    nDevis?: NullableStringFieldUpdateOperationsInput | string | null
    dateDevis?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nFacture?: NullableStringFieldUpdateOperationsInput | string | null
    dateFacture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    montantHT?: NullableStringFieldUpdateOperationsInput | string | null
    tva?: NullableStringFieldUpdateOperationsInput | string | null
    montantTTC?: NullableStringFieldUpdateOperationsInput | string | null
    montantTTCFinal?: NullableStringFieldUpdateOperationsInput | string | null
    montantAutofinancement?: NullableStringFieldUpdateOperationsInput | string | null
    fraisPoseCmptProsol?: NullableStringFieldUpdateOperationsInput | string | null
    paiement1erFactureSTEG?: NullableStringFieldUpdateOperationsInput | string | null
    paiement2emeFactureSTEG?: NullableStringFieldUpdateOperationsInput | string | null
    fraisAugmentationCalibre?: NullableStringFieldUpdateOperationsInput | string | null
    fraisMutationElec?: NullableStringFieldUpdateOperationsInput | string | null
    fraisMutationGaz?: NullableStringFieldUpdateOperationsInput | string | null
    fraisPassageMonoTri?: NullableStringFieldUpdateOperationsInput | string | null
    autresFrais?: NullableStringFieldUpdateOperationsInput | string | null
    reglementClient?: NullableStringFieldUpdateOperationsInput | string | null
    resteAPayer?: NullableStringFieldUpdateOperationsInput | string | null
    subventionDemandee?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    echeances?: EcheanceUncheckedUpdateManyWithoutProjetNestedInput
    logs?: ActionLogUncheckedUpdateManyWithoutProjetNestedInput
  }

  export type ProjetCreateManyInput = {
    id?: string
    codeBarres?: string | null
    reference: string
    abonnes: string
    email?: string | null
    cin?: string | null
    contact?: string | null
    coordonneesGps?: string | null
    adresseLieuImplantation?: string | null
    presenteParMF?: string | null
    district?: string | null
    gouvernorat?: string | null
    delegation?: string | null
    municipalite?: string | null
    typeProjet?: $Enums.TypeProjet
    etatDossier?: $Enums.EtatDossier
    classementDossier?: $Enums.ClassementDossier
    commentaire?: string | null
    approbationCommerciale?: $Enums.StatutApprobation
    approbationTechnique?: $Enums.StatutApprobation
    executionInstallation?: string | null
    reception?: string | null
    procesVerbal?: string | null
    contratAchat?: $Enums.TypeContrat | null
    montantFinancement?: string | null
    tauxInteret?: string | null
    banque?: string | null
    agentCommercialId?: string | null
    agentCommercialAutre?: string | null
    puissanceInstallee?: string | null
    typeCompteur?: $Enums.TypeCompteur | null
    numeroCompteur?: string | null
    calibreDisjoncteur?: string | null
    puissanceSouscrite?: string | null
    productionPrevisionnelle?: string | null
    consommationAnnuelle?: string | null
    nbModules?: number | null
    puUnitairePV?: string | null
    marquePV?: string | null
    modelePV?: string | null
    nbOnduleurs?: number | null
    puUnitaireOnd?: string | null
    puOndSiAutreW?: string | null
    marqueOnd?: string | null
    modeleOnd?: string | null
    autreModeleOnd?: string | null
    equipementSurMesure?: string | null
    interventionSurMesure?: string | null
    rapportPuissance?: string | null
    dateDepotDossier?: Date | string | null
    dateApprobation?: Date | string | null
    dateInstallation?: Date | string | null
    dateDepotDemandeMES?: Date | string | null
    datePaiementPoseCompteurProsol?: Date | string | null
    dateMES?: Date | string | null
    nPolice?: string | null
    nLotDebProsol?: string | null
    saisieProsol?: string | null
    nLotDeblocageSubvention?: string | null
    deblocageProsol?: string | null
    conditionSubvention?: string | null
    saisieSubvention?: string | null
    deblocageSubvention?: string | null
    nDevis?: string | null
    dateDevis?: Date | string | null
    nFacture?: string | null
    dateFacture?: Date | string | null
    montantHT?: string | null
    tva?: string | null
    montantTTC?: string | null
    montantTTCFinal?: string | null
    montantAutofinancement?: string | null
    fraisPoseCmptProsol?: string | null
    paiement1erFactureSTEG?: string | null
    paiement2emeFactureSTEG?: string | null
    fraisAugmentationCalibre?: string | null
    fraisMutationElec?: string | null
    fraisMutationGaz?: string | null
    fraisPassageMonoTri?: string | null
    autresFrais?: string | null
    reglementClient?: string | null
    resteAPayer?: string | null
    subventionDemandee?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjetUpdateManyMutationInput = {
    codeBarres?: NullableStringFieldUpdateOperationsInput | string | null
    reference?: StringFieldUpdateOperationsInput | string
    abonnes?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    cin?: NullableStringFieldUpdateOperationsInput | string | null
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    coordonneesGps?: NullableStringFieldUpdateOperationsInput | string | null
    adresseLieuImplantation?: NullableStringFieldUpdateOperationsInput | string | null
    presenteParMF?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    gouvernorat?: NullableStringFieldUpdateOperationsInput | string | null
    delegation?: NullableStringFieldUpdateOperationsInput | string | null
    municipalite?: NullableStringFieldUpdateOperationsInput | string | null
    typeProjet?: EnumTypeProjetFieldUpdateOperationsInput | $Enums.TypeProjet
    etatDossier?: EnumEtatDossierFieldUpdateOperationsInput | $Enums.EtatDossier
    classementDossier?: EnumClassementDossierFieldUpdateOperationsInput | $Enums.ClassementDossier
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    approbationCommerciale?: EnumStatutApprobationFieldUpdateOperationsInput | $Enums.StatutApprobation
    approbationTechnique?: EnumStatutApprobationFieldUpdateOperationsInput | $Enums.StatutApprobation
    executionInstallation?: NullableStringFieldUpdateOperationsInput | string | null
    reception?: NullableStringFieldUpdateOperationsInput | string | null
    procesVerbal?: NullableStringFieldUpdateOperationsInput | string | null
    contratAchat?: NullableEnumTypeContratFieldUpdateOperationsInput | $Enums.TypeContrat | null
    montantFinancement?: NullableStringFieldUpdateOperationsInput | string | null
    tauxInteret?: NullableStringFieldUpdateOperationsInput | string | null
    banque?: NullableStringFieldUpdateOperationsInput | string | null
    agentCommercialAutre?: NullableStringFieldUpdateOperationsInput | string | null
    puissanceInstallee?: NullableStringFieldUpdateOperationsInput | string | null
    typeCompteur?: NullableEnumTypeCompteurFieldUpdateOperationsInput | $Enums.TypeCompteur | null
    numeroCompteur?: NullableStringFieldUpdateOperationsInput | string | null
    calibreDisjoncteur?: NullableStringFieldUpdateOperationsInput | string | null
    puissanceSouscrite?: NullableStringFieldUpdateOperationsInput | string | null
    productionPrevisionnelle?: NullableStringFieldUpdateOperationsInput | string | null
    consommationAnnuelle?: NullableStringFieldUpdateOperationsInput | string | null
    nbModules?: NullableIntFieldUpdateOperationsInput | number | null
    puUnitairePV?: NullableStringFieldUpdateOperationsInput | string | null
    marquePV?: NullableStringFieldUpdateOperationsInput | string | null
    modelePV?: NullableStringFieldUpdateOperationsInput | string | null
    nbOnduleurs?: NullableIntFieldUpdateOperationsInput | number | null
    puUnitaireOnd?: NullableStringFieldUpdateOperationsInput | string | null
    puOndSiAutreW?: NullableStringFieldUpdateOperationsInput | string | null
    marqueOnd?: NullableStringFieldUpdateOperationsInput | string | null
    modeleOnd?: NullableStringFieldUpdateOperationsInput | string | null
    autreModeleOnd?: NullableStringFieldUpdateOperationsInput | string | null
    equipementSurMesure?: NullableStringFieldUpdateOperationsInput | string | null
    interventionSurMesure?: NullableStringFieldUpdateOperationsInput | string | null
    rapportPuissance?: NullableStringFieldUpdateOperationsInput | string | null
    dateDepotDossier?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateApprobation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateInstallation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateDepotDemandeMES?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    datePaiementPoseCompteurProsol?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateMES?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nPolice?: NullableStringFieldUpdateOperationsInput | string | null
    nLotDebProsol?: NullableStringFieldUpdateOperationsInput | string | null
    saisieProsol?: NullableStringFieldUpdateOperationsInput | string | null
    nLotDeblocageSubvention?: NullableStringFieldUpdateOperationsInput | string | null
    deblocageProsol?: NullableStringFieldUpdateOperationsInput | string | null
    conditionSubvention?: NullableStringFieldUpdateOperationsInput | string | null
    saisieSubvention?: NullableStringFieldUpdateOperationsInput | string | null
    deblocageSubvention?: NullableStringFieldUpdateOperationsInput | string | null
    nDevis?: NullableStringFieldUpdateOperationsInput | string | null
    dateDevis?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nFacture?: NullableStringFieldUpdateOperationsInput | string | null
    dateFacture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    montantHT?: NullableStringFieldUpdateOperationsInput | string | null
    tva?: NullableStringFieldUpdateOperationsInput | string | null
    montantTTC?: NullableStringFieldUpdateOperationsInput | string | null
    montantTTCFinal?: NullableStringFieldUpdateOperationsInput | string | null
    montantAutofinancement?: NullableStringFieldUpdateOperationsInput | string | null
    fraisPoseCmptProsol?: NullableStringFieldUpdateOperationsInput | string | null
    paiement1erFactureSTEG?: NullableStringFieldUpdateOperationsInput | string | null
    paiement2emeFactureSTEG?: NullableStringFieldUpdateOperationsInput | string | null
    fraisAugmentationCalibre?: NullableStringFieldUpdateOperationsInput | string | null
    fraisMutationElec?: NullableStringFieldUpdateOperationsInput | string | null
    fraisMutationGaz?: NullableStringFieldUpdateOperationsInput | string | null
    fraisPassageMonoTri?: NullableStringFieldUpdateOperationsInput | string | null
    autresFrais?: NullableStringFieldUpdateOperationsInput | string | null
    reglementClient?: NullableStringFieldUpdateOperationsInput | string | null
    resteAPayer?: NullableStringFieldUpdateOperationsInput | string | null
    subventionDemandee?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjetUncheckedUpdateManyInput = {
    codeBarres?: NullableStringFieldUpdateOperationsInput | string | null
    reference?: StringFieldUpdateOperationsInput | string
    abonnes?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    cin?: NullableStringFieldUpdateOperationsInput | string | null
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    coordonneesGps?: NullableStringFieldUpdateOperationsInput | string | null
    adresseLieuImplantation?: NullableStringFieldUpdateOperationsInput | string | null
    presenteParMF?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    gouvernorat?: NullableStringFieldUpdateOperationsInput | string | null
    delegation?: NullableStringFieldUpdateOperationsInput | string | null
    municipalite?: NullableStringFieldUpdateOperationsInput | string | null
    typeProjet?: EnumTypeProjetFieldUpdateOperationsInput | $Enums.TypeProjet
    etatDossier?: EnumEtatDossierFieldUpdateOperationsInput | $Enums.EtatDossier
    classementDossier?: EnumClassementDossierFieldUpdateOperationsInput | $Enums.ClassementDossier
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    approbationCommerciale?: EnumStatutApprobationFieldUpdateOperationsInput | $Enums.StatutApprobation
    approbationTechnique?: EnumStatutApprobationFieldUpdateOperationsInput | $Enums.StatutApprobation
    executionInstallation?: NullableStringFieldUpdateOperationsInput | string | null
    reception?: NullableStringFieldUpdateOperationsInput | string | null
    procesVerbal?: NullableStringFieldUpdateOperationsInput | string | null
    contratAchat?: NullableEnumTypeContratFieldUpdateOperationsInput | $Enums.TypeContrat | null
    montantFinancement?: NullableStringFieldUpdateOperationsInput | string | null
    tauxInteret?: NullableStringFieldUpdateOperationsInput | string | null
    banque?: NullableStringFieldUpdateOperationsInput | string | null
    agentCommercialId?: NullableStringFieldUpdateOperationsInput | string | null
    agentCommercialAutre?: NullableStringFieldUpdateOperationsInput | string | null
    puissanceInstallee?: NullableStringFieldUpdateOperationsInput | string | null
    typeCompteur?: NullableEnumTypeCompteurFieldUpdateOperationsInput | $Enums.TypeCompteur | null
    numeroCompteur?: NullableStringFieldUpdateOperationsInput | string | null
    calibreDisjoncteur?: NullableStringFieldUpdateOperationsInput | string | null
    puissanceSouscrite?: NullableStringFieldUpdateOperationsInput | string | null
    productionPrevisionnelle?: NullableStringFieldUpdateOperationsInput | string | null
    consommationAnnuelle?: NullableStringFieldUpdateOperationsInput | string | null
    nbModules?: NullableIntFieldUpdateOperationsInput | number | null
    puUnitairePV?: NullableStringFieldUpdateOperationsInput | string | null
    marquePV?: NullableStringFieldUpdateOperationsInput | string | null
    modelePV?: NullableStringFieldUpdateOperationsInput | string | null
    nbOnduleurs?: NullableIntFieldUpdateOperationsInput | number | null
    puUnitaireOnd?: NullableStringFieldUpdateOperationsInput | string | null
    puOndSiAutreW?: NullableStringFieldUpdateOperationsInput | string | null
    marqueOnd?: NullableStringFieldUpdateOperationsInput | string | null
    modeleOnd?: NullableStringFieldUpdateOperationsInput | string | null
    autreModeleOnd?: NullableStringFieldUpdateOperationsInput | string | null
    equipementSurMesure?: NullableStringFieldUpdateOperationsInput | string | null
    interventionSurMesure?: NullableStringFieldUpdateOperationsInput | string | null
    rapportPuissance?: NullableStringFieldUpdateOperationsInput | string | null
    dateDepotDossier?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateApprobation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateInstallation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateDepotDemandeMES?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    datePaiementPoseCompteurProsol?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateMES?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nPolice?: NullableStringFieldUpdateOperationsInput | string | null
    nLotDebProsol?: NullableStringFieldUpdateOperationsInput | string | null
    saisieProsol?: NullableStringFieldUpdateOperationsInput | string | null
    nLotDeblocageSubvention?: NullableStringFieldUpdateOperationsInput | string | null
    deblocageProsol?: NullableStringFieldUpdateOperationsInput | string | null
    conditionSubvention?: NullableStringFieldUpdateOperationsInput | string | null
    saisieSubvention?: NullableStringFieldUpdateOperationsInput | string | null
    deblocageSubvention?: NullableStringFieldUpdateOperationsInput | string | null
    nDevis?: NullableStringFieldUpdateOperationsInput | string | null
    dateDevis?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nFacture?: NullableStringFieldUpdateOperationsInput | string | null
    dateFacture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    montantHT?: NullableStringFieldUpdateOperationsInput | string | null
    tva?: NullableStringFieldUpdateOperationsInput | string | null
    montantTTC?: NullableStringFieldUpdateOperationsInput | string | null
    montantTTCFinal?: NullableStringFieldUpdateOperationsInput | string | null
    montantAutofinancement?: NullableStringFieldUpdateOperationsInput | string | null
    fraisPoseCmptProsol?: NullableStringFieldUpdateOperationsInput | string | null
    paiement1erFactureSTEG?: NullableStringFieldUpdateOperationsInput | string | null
    paiement2emeFactureSTEG?: NullableStringFieldUpdateOperationsInput | string | null
    fraisAugmentationCalibre?: NullableStringFieldUpdateOperationsInput | string | null
    fraisMutationElec?: NullableStringFieldUpdateOperationsInput | string | null
    fraisMutationGaz?: NullableStringFieldUpdateOperationsInput | string | null
    fraisPassageMonoTri?: NullableStringFieldUpdateOperationsInput | string | null
    autresFrais?: NullableStringFieldUpdateOperationsInput | string | null
    reglementClient?: NullableStringFieldUpdateOperationsInput | string | null
    resteAPayer?: NullableStringFieldUpdateOperationsInput | string | null
    subventionDemandee?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EcheanceCreateInput = {
    id?: string
    numero: number
    montant?: string | null
    date?: Date | string | null
    modePaiement?: string | null
    description?: string | null
    projet: ProjetCreateNestedOneWithoutEcheancesInput
  }

  export type EcheanceUncheckedCreateInput = {
    id?: string
    projetId: string
    numero: number
    montant?: string | null
    date?: Date | string | null
    modePaiement?: string | null
    description?: string | null
  }

  export type EcheanceUpdateInput = {
    numero?: IntFieldUpdateOperationsInput | number
    montant?: NullableStringFieldUpdateOperationsInput | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    modePaiement?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    projet?: ProjetUpdateOneRequiredWithoutEcheancesNestedInput
  }

  export type EcheanceUncheckedUpdateInput = {
    projetId?: StringFieldUpdateOperationsInput | string
    numero?: IntFieldUpdateOperationsInput | number
    montant?: NullableStringFieldUpdateOperationsInput | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    modePaiement?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EcheanceCreateManyInput = {
    id?: string
    projetId: string
    numero: number
    montant?: string | null
    date?: Date | string | null
    modePaiement?: string | null
    description?: string | null
  }

  export type EcheanceUpdateManyMutationInput = {
    numero?: IntFieldUpdateOperationsInput | number
    montant?: NullableStringFieldUpdateOperationsInput | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    modePaiement?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EcheanceUncheckedUpdateManyInput = {
    projetId?: StringFieldUpdateOperationsInput | string
    numero?: IntFieldUpdateOperationsInput | number
    montant?: NullableStringFieldUpdateOperationsInput | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    modePaiement?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ActionLogCreateInput = {
    id?: string
    action: string
    details?: InputJsonValue | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutLogsInput
    projet?: ProjetCreateNestedOneWithoutLogsInput
  }

  export type ActionLogUncheckedCreateInput = {
    id?: string
    userId: string
    projetId?: string | null
    action: string
    details?: InputJsonValue | null
    createdAt?: Date | string
  }

  export type ActionLogUpdateInput = {
    action?: StringFieldUpdateOperationsInput | string
    details?: InputJsonValue | InputJsonValue | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutLogsNestedInput
    projet?: ProjetUpdateOneWithoutLogsNestedInput
  }

  export type ActionLogUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    projetId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    details?: InputJsonValue | InputJsonValue | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActionLogCreateManyInput = {
    id?: string
    userId: string
    projetId?: string | null
    action: string
    details?: InputJsonValue | null
    createdAt?: Date | string
  }

  export type ActionLogUpdateManyMutationInput = {
    action?: StringFieldUpdateOperationsInput | string
    details?: InputJsonValue | InputJsonValue | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActionLogUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    projetId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    details?: InputJsonValue | InputJsonValue | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SocieteCreateInput = {
    id?: string
    code: string
    denomination?: string
    nomCommercial?: string
    adresseSiegeSocial?: string
    adresseActivite?: string
    formeJuridique?: string
    mf?: string
    capitalSocial?: string
    contactFixe?: string
    contactFax?: string
    contactMobile?: string
    adresseEmail?: string
    rib?: string
    banque?: string
    codeSteg?: string
    codeAnme?: string
    validiteAnme?: string
    gerant?: string
    pdfLogoDataUrl?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SocieteUncheckedCreateInput = {
    id?: string
    code: string
    denomination?: string
    nomCommercial?: string
    adresseSiegeSocial?: string
    adresseActivite?: string
    formeJuridique?: string
    mf?: string
    capitalSocial?: string
    contactFixe?: string
    contactFax?: string
    contactMobile?: string
    adresseEmail?: string
    rib?: string
    banque?: string
    codeSteg?: string
    codeAnme?: string
    validiteAnme?: string
    gerant?: string
    pdfLogoDataUrl?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SocieteUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    denomination?: StringFieldUpdateOperationsInput | string
    nomCommercial?: StringFieldUpdateOperationsInput | string
    adresseSiegeSocial?: StringFieldUpdateOperationsInput | string
    adresseActivite?: StringFieldUpdateOperationsInput | string
    formeJuridique?: StringFieldUpdateOperationsInput | string
    mf?: StringFieldUpdateOperationsInput | string
    capitalSocial?: StringFieldUpdateOperationsInput | string
    contactFixe?: StringFieldUpdateOperationsInput | string
    contactFax?: StringFieldUpdateOperationsInput | string
    contactMobile?: StringFieldUpdateOperationsInput | string
    adresseEmail?: StringFieldUpdateOperationsInput | string
    rib?: StringFieldUpdateOperationsInput | string
    banque?: StringFieldUpdateOperationsInput | string
    codeSteg?: StringFieldUpdateOperationsInput | string
    codeAnme?: StringFieldUpdateOperationsInput | string
    validiteAnme?: StringFieldUpdateOperationsInput | string
    gerant?: StringFieldUpdateOperationsInput | string
    pdfLogoDataUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SocieteUncheckedUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    denomination?: StringFieldUpdateOperationsInput | string
    nomCommercial?: StringFieldUpdateOperationsInput | string
    adresseSiegeSocial?: StringFieldUpdateOperationsInput | string
    adresseActivite?: StringFieldUpdateOperationsInput | string
    formeJuridique?: StringFieldUpdateOperationsInput | string
    mf?: StringFieldUpdateOperationsInput | string
    capitalSocial?: StringFieldUpdateOperationsInput | string
    contactFixe?: StringFieldUpdateOperationsInput | string
    contactFax?: StringFieldUpdateOperationsInput | string
    contactMobile?: StringFieldUpdateOperationsInput | string
    adresseEmail?: StringFieldUpdateOperationsInput | string
    rib?: StringFieldUpdateOperationsInput | string
    banque?: StringFieldUpdateOperationsInput | string
    codeSteg?: StringFieldUpdateOperationsInput | string
    codeAnme?: StringFieldUpdateOperationsInput | string
    validiteAnme?: StringFieldUpdateOperationsInput | string
    gerant?: StringFieldUpdateOperationsInput | string
    pdfLogoDataUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SocieteCreateManyInput = {
    id?: string
    code: string
    denomination?: string
    nomCommercial?: string
    adresseSiegeSocial?: string
    adresseActivite?: string
    formeJuridique?: string
    mf?: string
    capitalSocial?: string
    contactFixe?: string
    contactFax?: string
    contactMobile?: string
    adresseEmail?: string
    rib?: string
    banque?: string
    codeSteg?: string
    codeAnme?: string
    validiteAnme?: string
    gerant?: string
    pdfLogoDataUrl?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SocieteUpdateManyMutationInput = {
    code?: StringFieldUpdateOperationsInput | string
    denomination?: StringFieldUpdateOperationsInput | string
    nomCommercial?: StringFieldUpdateOperationsInput | string
    adresseSiegeSocial?: StringFieldUpdateOperationsInput | string
    adresseActivite?: StringFieldUpdateOperationsInput | string
    formeJuridique?: StringFieldUpdateOperationsInput | string
    mf?: StringFieldUpdateOperationsInput | string
    capitalSocial?: StringFieldUpdateOperationsInput | string
    contactFixe?: StringFieldUpdateOperationsInput | string
    contactFax?: StringFieldUpdateOperationsInput | string
    contactMobile?: StringFieldUpdateOperationsInput | string
    adresseEmail?: StringFieldUpdateOperationsInput | string
    rib?: StringFieldUpdateOperationsInput | string
    banque?: StringFieldUpdateOperationsInput | string
    codeSteg?: StringFieldUpdateOperationsInput | string
    codeAnme?: StringFieldUpdateOperationsInput | string
    validiteAnme?: StringFieldUpdateOperationsInput | string
    gerant?: StringFieldUpdateOperationsInput | string
    pdfLogoDataUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SocieteUncheckedUpdateManyInput = {
    code?: StringFieldUpdateOperationsInput | string
    denomination?: StringFieldUpdateOperationsInput | string
    nomCommercial?: StringFieldUpdateOperationsInput | string
    adresseSiegeSocial?: StringFieldUpdateOperationsInput | string
    adresseActivite?: StringFieldUpdateOperationsInput | string
    formeJuridique?: StringFieldUpdateOperationsInput | string
    mf?: StringFieldUpdateOperationsInput | string
    capitalSocial?: StringFieldUpdateOperationsInput | string
    contactFixe?: StringFieldUpdateOperationsInput | string
    contactFax?: StringFieldUpdateOperationsInput | string
    contactMobile?: StringFieldUpdateOperationsInput | string
    adresseEmail?: StringFieldUpdateOperationsInput | string
    rib?: StringFieldUpdateOperationsInput | string
    banque?: StringFieldUpdateOperationsInput | string
    codeSteg?: StringFieldUpdateOperationsInput | string
    codeAnme?: StringFieldUpdateOperationsInput | string
    validiteAnme?: StringFieldUpdateOperationsInput | string
    gerant?: StringFieldUpdateOperationsInput | string
    pdfLogoDataUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type ProjetListRelationFilter = {
    every?: ProjetWhereInput
    some?: ProjetWhereInput
    none?: ProjetWhereInput
  }

  export type ActionLogListRelationFilter = {
    every?: ActionLogWhereInput
    some?: ActionLogWhereInput
    none?: ActionLogWhereInput
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjetOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ActionLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrder
    telephone?: SortOrder
    password?: SortOrder
    role?: SortOrder
    actif?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    lastLoginAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrder
    telephone?: SortOrder
    password?: SortOrder
    role?: SortOrder
    actif?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    lastLoginAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrder
    telephone?: SortOrder
    password?: SortOrder
    role?: SortOrder
    actif?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    lastLoginAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    refreshToken?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    refreshToken?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    refreshToken?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumTypeProjetFilter<$PrismaModel = never> = {
    equals?: $Enums.TypeProjet | EnumTypeProjetFieldRefInput<$PrismaModel>
    in?: $Enums.TypeProjet[] | ListEnumTypeProjetFieldRefInput<$PrismaModel>
    notIn?: $Enums.TypeProjet[] | ListEnumTypeProjetFieldRefInput<$PrismaModel>
    not?: NestedEnumTypeProjetFilter<$PrismaModel> | $Enums.TypeProjet
  }

  export type EnumEtatDossierFilter<$PrismaModel = never> = {
    equals?: $Enums.EtatDossier | EnumEtatDossierFieldRefInput<$PrismaModel>
    in?: $Enums.EtatDossier[] | ListEnumEtatDossierFieldRefInput<$PrismaModel>
    notIn?: $Enums.EtatDossier[] | ListEnumEtatDossierFieldRefInput<$PrismaModel>
    not?: NestedEnumEtatDossierFilter<$PrismaModel> | $Enums.EtatDossier
  }

  export type EnumClassementDossierFilter<$PrismaModel = never> = {
    equals?: $Enums.ClassementDossier | EnumClassementDossierFieldRefInput<$PrismaModel>
    in?: $Enums.ClassementDossier[] | ListEnumClassementDossierFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClassementDossier[] | ListEnumClassementDossierFieldRefInput<$PrismaModel>
    not?: NestedEnumClassementDossierFilter<$PrismaModel> | $Enums.ClassementDossier
  }

  export type EnumStatutApprobationFilter<$PrismaModel = never> = {
    equals?: $Enums.StatutApprobation | EnumStatutApprobationFieldRefInput<$PrismaModel>
    in?: $Enums.StatutApprobation[] | ListEnumStatutApprobationFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatutApprobation[] | ListEnumStatutApprobationFieldRefInput<$PrismaModel>
    not?: NestedEnumStatutApprobationFilter<$PrismaModel> | $Enums.StatutApprobation
  }

  export type EnumTypeContratNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.TypeContrat | EnumTypeContratFieldRefInput<$PrismaModel> | null
    in?: $Enums.TypeContrat[] | ListEnumTypeContratFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.TypeContrat[] | ListEnumTypeContratFieldRefInput<$PrismaModel> | null
    not?: NestedEnumTypeContratNullableFilter<$PrismaModel> | $Enums.TypeContrat | null
    isSet?: boolean
  }

  export type EnumTypeCompteurNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.TypeCompteur | EnumTypeCompteurFieldRefInput<$PrismaModel> | null
    in?: $Enums.TypeCompteur[] | ListEnumTypeCompteurFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.TypeCompteur[] | ListEnumTypeCompteurFieldRefInput<$PrismaModel> | null
    not?: NestedEnumTypeCompteurNullableFilter<$PrismaModel> | $Enums.TypeCompteur | null
    isSet?: boolean
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type EcheanceListRelationFilter = {
    every?: EcheanceWhereInput
    some?: EcheanceWhereInput
    none?: EcheanceWhereInput
  }

  export type EcheanceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjetCountOrderByAggregateInput = {
    id?: SortOrder
    codeBarres?: SortOrder
    reference?: SortOrder
    abonnes?: SortOrder
    email?: SortOrder
    cin?: SortOrder
    contact?: SortOrder
    coordonneesGps?: SortOrder
    adresseLieuImplantation?: SortOrder
    presenteParMF?: SortOrder
    district?: SortOrder
    gouvernorat?: SortOrder
    delegation?: SortOrder
    municipalite?: SortOrder
    typeProjet?: SortOrder
    etatDossier?: SortOrder
    classementDossier?: SortOrder
    commentaire?: SortOrder
    approbationCommerciale?: SortOrder
    approbationTechnique?: SortOrder
    executionInstallation?: SortOrder
    reception?: SortOrder
    procesVerbal?: SortOrder
    contratAchat?: SortOrder
    montantFinancement?: SortOrder
    tauxInteret?: SortOrder
    banque?: SortOrder
    agentCommercialId?: SortOrder
    agentCommercialAutre?: SortOrder
    puissanceInstallee?: SortOrder
    typeCompteur?: SortOrder
    numeroCompteur?: SortOrder
    calibreDisjoncteur?: SortOrder
    puissanceSouscrite?: SortOrder
    productionPrevisionnelle?: SortOrder
    consommationAnnuelle?: SortOrder
    nbModules?: SortOrder
    puUnitairePV?: SortOrder
    marquePV?: SortOrder
    modelePV?: SortOrder
    nbOnduleurs?: SortOrder
    puUnitaireOnd?: SortOrder
    puOndSiAutreW?: SortOrder
    marqueOnd?: SortOrder
    modeleOnd?: SortOrder
    autreModeleOnd?: SortOrder
    equipementSurMesure?: SortOrder
    interventionSurMesure?: SortOrder
    rapportPuissance?: SortOrder
    dateDepotDossier?: SortOrder
    dateApprobation?: SortOrder
    dateInstallation?: SortOrder
    dateDepotDemandeMES?: SortOrder
    datePaiementPoseCompteurProsol?: SortOrder
    dateMES?: SortOrder
    nPolice?: SortOrder
    nLotDebProsol?: SortOrder
    saisieProsol?: SortOrder
    nLotDeblocageSubvention?: SortOrder
    deblocageProsol?: SortOrder
    conditionSubvention?: SortOrder
    saisieSubvention?: SortOrder
    deblocageSubvention?: SortOrder
    nDevis?: SortOrder
    dateDevis?: SortOrder
    nFacture?: SortOrder
    dateFacture?: SortOrder
    montantHT?: SortOrder
    tva?: SortOrder
    montantTTC?: SortOrder
    montantTTCFinal?: SortOrder
    montantAutofinancement?: SortOrder
    fraisPoseCmptProsol?: SortOrder
    paiement1erFactureSTEG?: SortOrder
    paiement2emeFactureSTEG?: SortOrder
    fraisAugmentationCalibre?: SortOrder
    fraisMutationElec?: SortOrder
    fraisMutationGaz?: SortOrder
    fraisPassageMonoTri?: SortOrder
    autresFrais?: SortOrder
    reglementClient?: SortOrder
    resteAPayer?: SortOrder
    subventionDemandee?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjetAvgOrderByAggregateInput = {
    nbModules?: SortOrder
    nbOnduleurs?: SortOrder
  }

  export type ProjetMaxOrderByAggregateInput = {
    id?: SortOrder
    codeBarres?: SortOrder
    reference?: SortOrder
    abonnes?: SortOrder
    email?: SortOrder
    cin?: SortOrder
    contact?: SortOrder
    coordonneesGps?: SortOrder
    adresseLieuImplantation?: SortOrder
    presenteParMF?: SortOrder
    district?: SortOrder
    gouvernorat?: SortOrder
    delegation?: SortOrder
    municipalite?: SortOrder
    typeProjet?: SortOrder
    etatDossier?: SortOrder
    classementDossier?: SortOrder
    commentaire?: SortOrder
    approbationCommerciale?: SortOrder
    approbationTechnique?: SortOrder
    executionInstallation?: SortOrder
    reception?: SortOrder
    procesVerbal?: SortOrder
    contratAchat?: SortOrder
    montantFinancement?: SortOrder
    tauxInteret?: SortOrder
    banque?: SortOrder
    agentCommercialId?: SortOrder
    agentCommercialAutre?: SortOrder
    puissanceInstallee?: SortOrder
    typeCompteur?: SortOrder
    numeroCompteur?: SortOrder
    calibreDisjoncteur?: SortOrder
    puissanceSouscrite?: SortOrder
    productionPrevisionnelle?: SortOrder
    consommationAnnuelle?: SortOrder
    nbModules?: SortOrder
    puUnitairePV?: SortOrder
    marquePV?: SortOrder
    modelePV?: SortOrder
    nbOnduleurs?: SortOrder
    puUnitaireOnd?: SortOrder
    puOndSiAutreW?: SortOrder
    marqueOnd?: SortOrder
    modeleOnd?: SortOrder
    autreModeleOnd?: SortOrder
    equipementSurMesure?: SortOrder
    interventionSurMesure?: SortOrder
    rapportPuissance?: SortOrder
    dateDepotDossier?: SortOrder
    dateApprobation?: SortOrder
    dateInstallation?: SortOrder
    dateDepotDemandeMES?: SortOrder
    datePaiementPoseCompteurProsol?: SortOrder
    dateMES?: SortOrder
    nPolice?: SortOrder
    nLotDebProsol?: SortOrder
    saisieProsol?: SortOrder
    nLotDeblocageSubvention?: SortOrder
    deblocageProsol?: SortOrder
    conditionSubvention?: SortOrder
    saisieSubvention?: SortOrder
    deblocageSubvention?: SortOrder
    nDevis?: SortOrder
    dateDevis?: SortOrder
    nFacture?: SortOrder
    dateFacture?: SortOrder
    montantHT?: SortOrder
    tva?: SortOrder
    montantTTC?: SortOrder
    montantTTCFinal?: SortOrder
    montantAutofinancement?: SortOrder
    fraisPoseCmptProsol?: SortOrder
    paiement1erFactureSTEG?: SortOrder
    paiement2emeFactureSTEG?: SortOrder
    fraisAugmentationCalibre?: SortOrder
    fraisMutationElec?: SortOrder
    fraisMutationGaz?: SortOrder
    fraisPassageMonoTri?: SortOrder
    autresFrais?: SortOrder
    reglementClient?: SortOrder
    resteAPayer?: SortOrder
    subventionDemandee?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjetMinOrderByAggregateInput = {
    id?: SortOrder
    codeBarres?: SortOrder
    reference?: SortOrder
    abonnes?: SortOrder
    email?: SortOrder
    cin?: SortOrder
    contact?: SortOrder
    coordonneesGps?: SortOrder
    adresseLieuImplantation?: SortOrder
    presenteParMF?: SortOrder
    district?: SortOrder
    gouvernorat?: SortOrder
    delegation?: SortOrder
    municipalite?: SortOrder
    typeProjet?: SortOrder
    etatDossier?: SortOrder
    classementDossier?: SortOrder
    commentaire?: SortOrder
    approbationCommerciale?: SortOrder
    approbationTechnique?: SortOrder
    executionInstallation?: SortOrder
    reception?: SortOrder
    procesVerbal?: SortOrder
    contratAchat?: SortOrder
    montantFinancement?: SortOrder
    tauxInteret?: SortOrder
    banque?: SortOrder
    agentCommercialId?: SortOrder
    agentCommercialAutre?: SortOrder
    puissanceInstallee?: SortOrder
    typeCompteur?: SortOrder
    numeroCompteur?: SortOrder
    calibreDisjoncteur?: SortOrder
    puissanceSouscrite?: SortOrder
    productionPrevisionnelle?: SortOrder
    consommationAnnuelle?: SortOrder
    nbModules?: SortOrder
    puUnitairePV?: SortOrder
    marquePV?: SortOrder
    modelePV?: SortOrder
    nbOnduleurs?: SortOrder
    puUnitaireOnd?: SortOrder
    puOndSiAutreW?: SortOrder
    marqueOnd?: SortOrder
    modeleOnd?: SortOrder
    autreModeleOnd?: SortOrder
    equipementSurMesure?: SortOrder
    interventionSurMesure?: SortOrder
    rapportPuissance?: SortOrder
    dateDepotDossier?: SortOrder
    dateApprobation?: SortOrder
    dateInstallation?: SortOrder
    dateDepotDemandeMES?: SortOrder
    datePaiementPoseCompteurProsol?: SortOrder
    dateMES?: SortOrder
    nPolice?: SortOrder
    nLotDebProsol?: SortOrder
    saisieProsol?: SortOrder
    nLotDeblocageSubvention?: SortOrder
    deblocageProsol?: SortOrder
    conditionSubvention?: SortOrder
    saisieSubvention?: SortOrder
    deblocageSubvention?: SortOrder
    nDevis?: SortOrder
    dateDevis?: SortOrder
    nFacture?: SortOrder
    dateFacture?: SortOrder
    montantHT?: SortOrder
    tva?: SortOrder
    montantTTC?: SortOrder
    montantTTCFinal?: SortOrder
    montantAutofinancement?: SortOrder
    fraisPoseCmptProsol?: SortOrder
    paiement1erFactureSTEG?: SortOrder
    paiement2emeFactureSTEG?: SortOrder
    fraisAugmentationCalibre?: SortOrder
    fraisMutationElec?: SortOrder
    fraisMutationGaz?: SortOrder
    fraisPassageMonoTri?: SortOrder
    autresFrais?: SortOrder
    reglementClient?: SortOrder
    resteAPayer?: SortOrder
    subventionDemandee?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjetSumOrderByAggregateInput = {
    nbModules?: SortOrder
    nbOnduleurs?: SortOrder
  }

  export type EnumTypeProjetWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TypeProjet | EnumTypeProjetFieldRefInput<$PrismaModel>
    in?: $Enums.TypeProjet[] | ListEnumTypeProjetFieldRefInput<$PrismaModel>
    notIn?: $Enums.TypeProjet[] | ListEnumTypeProjetFieldRefInput<$PrismaModel>
    not?: NestedEnumTypeProjetWithAggregatesFilter<$PrismaModel> | $Enums.TypeProjet
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTypeProjetFilter<$PrismaModel>
    _max?: NestedEnumTypeProjetFilter<$PrismaModel>
  }

  export type EnumEtatDossierWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EtatDossier | EnumEtatDossierFieldRefInput<$PrismaModel>
    in?: $Enums.EtatDossier[] | ListEnumEtatDossierFieldRefInput<$PrismaModel>
    notIn?: $Enums.EtatDossier[] | ListEnumEtatDossierFieldRefInput<$PrismaModel>
    not?: NestedEnumEtatDossierWithAggregatesFilter<$PrismaModel> | $Enums.EtatDossier
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEtatDossierFilter<$PrismaModel>
    _max?: NestedEnumEtatDossierFilter<$PrismaModel>
  }

  export type EnumClassementDossierWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ClassementDossier | EnumClassementDossierFieldRefInput<$PrismaModel>
    in?: $Enums.ClassementDossier[] | ListEnumClassementDossierFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClassementDossier[] | ListEnumClassementDossierFieldRefInput<$PrismaModel>
    not?: NestedEnumClassementDossierWithAggregatesFilter<$PrismaModel> | $Enums.ClassementDossier
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumClassementDossierFilter<$PrismaModel>
    _max?: NestedEnumClassementDossierFilter<$PrismaModel>
  }

  export type EnumStatutApprobationWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatutApprobation | EnumStatutApprobationFieldRefInput<$PrismaModel>
    in?: $Enums.StatutApprobation[] | ListEnumStatutApprobationFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatutApprobation[] | ListEnumStatutApprobationFieldRefInput<$PrismaModel>
    not?: NestedEnumStatutApprobationWithAggregatesFilter<$PrismaModel> | $Enums.StatutApprobation
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatutApprobationFilter<$PrismaModel>
    _max?: NestedEnumStatutApprobationFilter<$PrismaModel>
  }

  export type EnumTypeContratNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TypeContrat | EnumTypeContratFieldRefInput<$PrismaModel> | null
    in?: $Enums.TypeContrat[] | ListEnumTypeContratFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.TypeContrat[] | ListEnumTypeContratFieldRefInput<$PrismaModel> | null
    not?: NestedEnumTypeContratNullableWithAggregatesFilter<$PrismaModel> | $Enums.TypeContrat | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumTypeContratNullableFilter<$PrismaModel>
    _max?: NestedEnumTypeContratNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type EnumTypeCompteurNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TypeCompteur | EnumTypeCompteurFieldRefInput<$PrismaModel> | null
    in?: $Enums.TypeCompteur[] | ListEnumTypeCompteurFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.TypeCompteur[] | ListEnumTypeCompteurFieldRefInput<$PrismaModel> | null
    not?: NestedEnumTypeCompteurNullableWithAggregatesFilter<$PrismaModel> | $Enums.TypeCompteur | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumTypeCompteurNullableFilter<$PrismaModel>
    _max?: NestedEnumTypeCompteurNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ProjetScalarRelationFilter = {
    is?: ProjetWhereInput
    isNot?: ProjetWhereInput
  }

  export type EcheanceProjetIdNumeroCompoundUniqueInput = {
    projetId: string
    numero: number
  }

  export type EcheanceCountOrderByAggregateInput = {
    id?: SortOrder
    projetId?: SortOrder
    numero?: SortOrder
    montant?: SortOrder
    date?: SortOrder
    modePaiement?: SortOrder
    description?: SortOrder
  }

  export type EcheanceAvgOrderByAggregateInput = {
    numero?: SortOrder
  }

  export type EcheanceMaxOrderByAggregateInput = {
    id?: SortOrder
    projetId?: SortOrder
    numero?: SortOrder
    montant?: SortOrder
    date?: SortOrder
    modePaiement?: SortOrder
    description?: SortOrder
  }

  export type EcheanceMinOrderByAggregateInput = {
    id?: SortOrder
    projetId?: SortOrder
    numero?: SortOrder
    montant?: SortOrder
    date?: SortOrder
    modePaiement?: SortOrder
    description?: SortOrder
  }

  export type EcheanceSumOrderByAggregateInput = {
    numero?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    isSet?: boolean
  }

  export type ProjetNullableScalarRelationFilter = {
    is?: ProjetWhereInput | null
    isNot?: ProjetWhereInput | null
  }

  export type ActionLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    projetId?: SortOrder
    action?: SortOrder
    details?: SortOrder
    createdAt?: SortOrder
  }

  export type ActionLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    projetId?: SortOrder
    action?: SortOrder
    createdAt?: SortOrder
  }

  export type ActionLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    projetId?: SortOrder
    action?: SortOrder
    createdAt?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type SocieteCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    denomination?: SortOrder
    nomCommercial?: SortOrder
    adresseSiegeSocial?: SortOrder
    adresseActivite?: SortOrder
    formeJuridique?: SortOrder
    mf?: SortOrder
    capitalSocial?: SortOrder
    contactFixe?: SortOrder
    contactFax?: SortOrder
    contactMobile?: SortOrder
    adresseEmail?: SortOrder
    rib?: SortOrder
    banque?: SortOrder
    codeSteg?: SortOrder
    codeAnme?: SortOrder
    validiteAnme?: SortOrder
    gerant?: SortOrder
    pdfLogoDataUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SocieteMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    denomination?: SortOrder
    nomCommercial?: SortOrder
    adresseSiegeSocial?: SortOrder
    adresseActivite?: SortOrder
    formeJuridique?: SortOrder
    mf?: SortOrder
    capitalSocial?: SortOrder
    contactFixe?: SortOrder
    contactFax?: SortOrder
    contactMobile?: SortOrder
    adresseEmail?: SortOrder
    rib?: SortOrder
    banque?: SortOrder
    codeSteg?: SortOrder
    codeAnme?: SortOrder
    validiteAnme?: SortOrder
    gerant?: SortOrder
    pdfLogoDataUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SocieteMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    denomination?: SortOrder
    nomCommercial?: SortOrder
    adresseSiegeSocial?: SortOrder
    adresseActivite?: SortOrder
    formeJuridique?: SortOrder
    mf?: SortOrder
    capitalSocial?: SortOrder
    contactFixe?: SortOrder
    contactFax?: SortOrder
    contactMobile?: SortOrder
    adresseEmail?: SortOrder
    rib?: SortOrder
    banque?: SortOrder
    codeSteg?: SortOrder
    codeAnme?: SortOrder
    validiteAnme?: SortOrder
    gerant?: SortOrder
    pdfLogoDataUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type ProjetCreateNestedManyWithoutAgentCommercialInput = {
    create?: XOR<ProjetCreateWithoutAgentCommercialInput, ProjetUncheckedCreateWithoutAgentCommercialInput> | ProjetCreateWithoutAgentCommercialInput[] | ProjetUncheckedCreateWithoutAgentCommercialInput[]
    connectOrCreate?: ProjetCreateOrConnectWithoutAgentCommercialInput | ProjetCreateOrConnectWithoutAgentCommercialInput[]
    createMany?: ProjetCreateManyAgentCommercialInputEnvelope
    connect?: ProjetWhereUniqueInput | ProjetWhereUniqueInput[]
  }

  export type ActionLogCreateNestedManyWithoutUserInput = {
    create?: XOR<ActionLogCreateWithoutUserInput, ActionLogUncheckedCreateWithoutUserInput> | ActionLogCreateWithoutUserInput[] | ActionLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActionLogCreateOrConnectWithoutUserInput | ActionLogCreateOrConnectWithoutUserInput[]
    createMany?: ActionLogCreateManyUserInputEnvelope
    connect?: ActionLogWhereUniqueInput | ActionLogWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type ProjetUncheckedCreateNestedManyWithoutAgentCommercialInput = {
    create?: XOR<ProjetCreateWithoutAgentCommercialInput, ProjetUncheckedCreateWithoutAgentCommercialInput> | ProjetCreateWithoutAgentCommercialInput[] | ProjetUncheckedCreateWithoutAgentCommercialInput[]
    connectOrCreate?: ProjetCreateOrConnectWithoutAgentCommercialInput | ProjetCreateOrConnectWithoutAgentCommercialInput[]
    createMany?: ProjetCreateManyAgentCommercialInputEnvelope
    connect?: ProjetWhereUniqueInput | ProjetWhereUniqueInput[]
  }

  export type ActionLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ActionLogCreateWithoutUserInput, ActionLogUncheckedCreateWithoutUserInput> | ActionLogCreateWithoutUserInput[] | ActionLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActionLogCreateOrConnectWithoutUserInput | ActionLogCreateOrConnectWithoutUserInput[]
    createMany?: ActionLogCreateManyUserInputEnvelope
    connect?: ActionLogWhereUniqueInput | ActionLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
    unset?: boolean
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type ProjetUpdateManyWithoutAgentCommercialNestedInput = {
    create?: XOR<ProjetCreateWithoutAgentCommercialInput, ProjetUncheckedCreateWithoutAgentCommercialInput> | ProjetCreateWithoutAgentCommercialInput[] | ProjetUncheckedCreateWithoutAgentCommercialInput[]
    connectOrCreate?: ProjetCreateOrConnectWithoutAgentCommercialInput | ProjetCreateOrConnectWithoutAgentCommercialInput[]
    upsert?: ProjetUpsertWithWhereUniqueWithoutAgentCommercialInput | ProjetUpsertWithWhereUniqueWithoutAgentCommercialInput[]
    createMany?: ProjetCreateManyAgentCommercialInputEnvelope
    set?: ProjetWhereUniqueInput | ProjetWhereUniqueInput[]
    disconnect?: ProjetWhereUniqueInput | ProjetWhereUniqueInput[]
    delete?: ProjetWhereUniqueInput | ProjetWhereUniqueInput[]
    connect?: ProjetWhereUniqueInput | ProjetWhereUniqueInput[]
    update?: ProjetUpdateWithWhereUniqueWithoutAgentCommercialInput | ProjetUpdateWithWhereUniqueWithoutAgentCommercialInput[]
    updateMany?: ProjetUpdateManyWithWhereWithoutAgentCommercialInput | ProjetUpdateManyWithWhereWithoutAgentCommercialInput[]
    deleteMany?: ProjetScalarWhereInput | ProjetScalarWhereInput[]
  }

  export type ActionLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActionLogCreateWithoutUserInput, ActionLogUncheckedCreateWithoutUserInput> | ActionLogCreateWithoutUserInput[] | ActionLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActionLogCreateOrConnectWithoutUserInput | ActionLogCreateOrConnectWithoutUserInput[]
    upsert?: ActionLogUpsertWithWhereUniqueWithoutUserInput | ActionLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActionLogCreateManyUserInputEnvelope
    set?: ActionLogWhereUniqueInput | ActionLogWhereUniqueInput[]
    disconnect?: ActionLogWhereUniqueInput | ActionLogWhereUniqueInput[]
    delete?: ActionLogWhereUniqueInput | ActionLogWhereUniqueInput[]
    connect?: ActionLogWhereUniqueInput | ActionLogWhereUniqueInput[]
    update?: ActionLogUpdateWithWhereUniqueWithoutUserInput | ActionLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActionLogUpdateManyWithWhereWithoutUserInput | ActionLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActionLogScalarWhereInput | ActionLogScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type ProjetUncheckedUpdateManyWithoutAgentCommercialNestedInput = {
    create?: XOR<ProjetCreateWithoutAgentCommercialInput, ProjetUncheckedCreateWithoutAgentCommercialInput> | ProjetCreateWithoutAgentCommercialInput[] | ProjetUncheckedCreateWithoutAgentCommercialInput[]
    connectOrCreate?: ProjetCreateOrConnectWithoutAgentCommercialInput | ProjetCreateOrConnectWithoutAgentCommercialInput[]
    upsert?: ProjetUpsertWithWhereUniqueWithoutAgentCommercialInput | ProjetUpsertWithWhereUniqueWithoutAgentCommercialInput[]
    createMany?: ProjetCreateManyAgentCommercialInputEnvelope
    set?: ProjetWhereUniqueInput | ProjetWhereUniqueInput[]
    disconnect?: ProjetWhereUniqueInput | ProjetWhereUniqueInput[]
    delete?: ProjetWhereUniqueInput | ProjetWhereUniqueInput[]
    connect?: ProjetWhereUniqueInput | ProjetWhereUniqueInput[]
    update?: ProjetUpdateWithWhereUniqueWithoutAgentCommercialInput | ProjetUpdateWithWhereUniqueWithoutAgentCommercialInput[]
    updateMany?: ProjetUpdateManyWithWhereWithoutAgentCommercialInput | ProjetUpdateManyWithWhereWithoutAgentCommercialInput[]
    deleteMany?: ProjetScalarWhereInput | ProjetScalarWhereInput[]
  }

  export type ActionLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActionLogCreateWithoutUserInput, ActionLogUncheckedCreateWithoutUserInput> | ActionLogCreateWithoutUserInput[] | ActionLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActionLogCreateOrConnectWithoutUserInput | ActionLogCreateOrConnectWithoutUserInput[]
    upsert?: ActionLogUpsertWithWhereUniqueWithoutUserInput | ActionLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActionLogCreateManyUserInputEnvelope
    set?: ActionLogWhereUniqueInput | ActionLogWhereUniqueInput[]
    disconnect?: ActionLogWhereUniqueInput | ActionLogWhereUniqueInput[]
    delete?: ActionLogWhereUniqueInput | ActionLogWhereUniqueInput[]
    connect?: ActionLogWhereUniqueInput | ActionLogWhereUniqueInput[]
    update?: ActionLogUpdateWithWhereUniqueWithoutUserInput | ActionLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActionLogUpdateManyWithWhereWithoutUserInput | ActionLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActionLogScalarWhereInput | ActionLogScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserCreateNestedOneWithoutProjetsInput = {
    create?: XOR<UserCreateWithoutProjetsInput, UserUncheckedCreateWithoutProjetsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjetsInput
    connect?: UserWhereUniqueInput
  }

  export type EcheanceCreateNestedManyWithoutProjetInput = {
    create?: XOR<EcheanceCreateWithoutProjetInput, EcheanceUncheckedCreateWithoutProjetInput> | EcheanceCreateWithoutProjetInput[] | EcheanceUncheckedCreateWithoutProjetInput[]
    connectOrCreate?: EcheanceCreateOrConnectWithoutProjetInput | EcheanceCreateOrConnectWithoutProjetInput[]
    createMany?: EcheanceCreateManyProjetInputEnvelope
    connect?: EcheanceWhereUniqueInput | EcheanceWhereUniqueInput[]
  }

  export type ActionLogCreateNestedManyWithoutProjetInput = {
    create?: XOR<ActionLogCreateWithoutProjetInput, ActionLogUncheckedCreateWithoutProjetInput> | ActionLogCreateWithoutProjetInput[] | ActionLogUncheckedCreateWithoutProjetInput[]
    connectOrCreate?: ActionLogCreateOrConnectWithoutProjetInput | ActionLogCreateOrConnectWithoutProjetInput[]
    createMany?: ActionLogCreateManyProjetInputEnvelope
    connect?: ActionLogWhereUniqueInput | ActionLogWhereUniqueInput[]
  }

  export type EcheanceUncheckedCreateNestedManyWithoutProjetInput = {
    create?: XOR<EcheanceCreateWithoutProjetInput, EcheanceUncheckedCreateWithoutProjetInput> | EcheanceCreateWithoutProjetInput[] | EcheanceUncheckedCreateWithoutProjetInput[]
    connectOrCreate?: EcheanceCreateOrConnectWithoutProjetInput | EcheanceCreateOrConnectWithoutProjetInput[]
    createMany?: EcheanceCreateManyProjetInputEnvelope
    connect?: EcheanceWhereUniqueInput | EcheanceWhereUniqueInput[]
  }

  export type ActionLogUncheckedCreateNestedManyWithoutProjetInput = {
    create?: XOR<ActionLogCreateWithoutProjetInput, ActionLogUncheckedCreateWithoutProjetInput> | ActionLogCreateWithoutProjetInput[] | ActionLogUncheckedCreateWithoutProjetInput[]
    connectOrCreate?: ActionLogCreateOrConnectWithoutProjetInput | ActionLogCreateOrConnectWithoutProjetInput[]
    createMany?: ActionLogCreateManyProjetInputEnvelope
    connect?: ActionLogWhereUniqueInput | ActionLogWhereUniqueInput[]
  }

  export type EnumTypeProjetFieldUpdateOperationsInput = {
    set?: $Enums.TypeProjet
  }

  export type EnumEtatDossierFieldUpdateOperationsInput = {
    set?: $Enums.EtatDossier
  }

  export type EnumClassementDossierFieldUpdateOperationsInput = {
    set?: $Enums.ClassementDossier
  }

  export type EnumStatutApprobationFieldUpdateOperationsInput = {
    set?: $Enums.StatutApprobation
  }

  export type NullableEnumTypeContratFieldUpdateOperationsInput = {
    set?: $Enums.TypeContrat | null
    unset?: boolean
  }

  export type NullableEnumTypeCompteurFieldUpdateOperationsInput = {
    set?: $Enums.TypeCompteur | null
    unset?: boolean
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
    unset?: boolean
  }

  export type UserUpdateOneWithoutProjetsNestedInput = {
    create?: XOR<UserCreateWithoutProjetsInput, UserUncheckedCreateWithoutProjetsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjetsInput
    upsert?: UserUpsertWithoutProjetsInput
    disconnect?: boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProjetsInput, UserUpdateWithoutProjetsInput>, UserUncheckedUpdateWithoutProjetsInput>
  }

  export type EcheanceUpdateManyWithoutProjetNestedInput = {
    create?: XOR<EcheanceCreateWithoutProjetInput, EcheanceUncheckedCreateWithoutProjetInput> | EcheanceCreateWithoutProjetInput[] | EcheanceUncheckedCreateWithoutProjetInput[]
    connectOrCreate?: EcheanceCreateOrConnectWithoutProjetInput | EcheanceCreateOrConnectWithoutProjetInput[]
    upsert?: EcheanceUpsertWithWhereUniqueWithoutProjetInput | EcheanceUpsertWithWhereUniqueWithoutProjetInput[]
    createMany?: EcheanceCreateManyProjetInputEnvelope
    set?: EcheanceWhereUniqueInput | EcheanceWhereUniqueInput[]
    disconnect?: EcheanceWhereUniqueInput | EcheanceWhereUniqueInput[]
    delete?: EcheanceWhereUniqueInput | EcheanceWhereUniqueInput[]
    connect?: EcheanceWhereUniqueInput | EcheanceWhereUniqueInput[]
    update?: EcheanceUpdateWithWhereUniqueWithoutProjetInput | EcheanceUpdateWithWhereUniqueWithoutProjetInput[]
    updateMany?: EcheanceUpdateManyWithWhereWithoutProjetInput | EcheanceUpdateManyWithWhereWithoutProjetInput[]
    deleteMany?: EcheanceScalarWhereInput | EcheanceScalarWhereInput[]
  }

  export type ActionLogUpdateManyWithoutProjetNestedInput = {
    create?: XOR<ActionLogCreateWithoutProjetInput, ActionLogUncheckedCreateWithoutProjetInput> | ActionLogCreateWithoutProjetInput[] | ActionLogUncheckedCreateWithoutProjetInput[]
    connectOrCreate?: ActionLogCreateOrConnectWithoutProjetInput | ActionLogCreateOrConnectWithoutProjetInput[]
    upsert?: ActionLogUpsertWithWhereUniqueWithoutProjetInput | ActionLogUpsertWithWhereUniqueWithoutProjetInput[]
    createMany?: ActionLogCreateManyProjetInputEnvelope
    set?: ActionLogWhereUniqueInput | ActionLogWhereUniqueInput[]
    disconnect?: ActionLogWhereUniqueInput | ActionLogWhereUniqueInput[]
    delete?: ActionLogWhereUniqueInput | ActionLogWhereUniqueInput[]
    connect?: ActionLogWhereUniqueInput | ActionLogWhereUniqueInput[]
    update?: ActionLogUpdateWithWhereUniqueWithoutProjetInput | ActionLogUpdateWithWhereUniqueWithoutProjetInput[]
    updateMany?: ActionLogUpdateManyWithWhereWithoutProjetInput | ActionLogUpdateManyWithWhereWithoutProjetInput[]
    deleteMany?: ActionLogScalarWhereInput | ActionLogScalarWhereInput[]
  }

  export type EcheanceUncheckedUpdateManyWithoutProjetNestedInput = {
    create?: XOR<EcheanceCreateWithoutProjetInput, EcheanceUncheckedCreateWithoutProjetInput> | EcheanceCreateWithoutProjetInput[] | EcheanceUncheckedCreateWithoutProjetInput[]
    connectOrCreate?: EcheanceCreateOrConnectWithoutProjetInput | EcheanceCreateOrConnectWithoutProjetInput[]
    upsert?: EcheanceUpsertWithWhereUniqueWithoutProjetInput | EcheanceUpsertWithWhereUniqueWithoutProjetInput[]
    createMany?: EcheanceCreateManyProjetInputEnvelope
    set?: EcheanceWhereUniqueInput | EcheanceWhereUniqueInput[]
    disconnect?: EcheanceWhereUniqueInput | EcheanceWhereUniqueInput[]
    delete?: EcheanceWhereUniqueInput | EcheanceWhereUniqueInput[]
    connect?: EcheanceWhereUniqueInput | EcheanceWhereUniqueInput[]
    update?: EcheanceUpdateWithWhereUniqueWithoutProjetInput | EcheanceUpdateWithWhereUniqueWithoutProjetInput[]
    updateMany?: EcheanceUpdateManyWithWhereWithoutProjetInput | EcheanceUpdateManyWithWhereWithoutProjetInput[]
    deleteMany?: EcheanceScalarWhereInput | EcheanceScalarWhereInput[]
  }

  export type ActionLogUncheckedUpdateManyWithoutProjetNestedInput = {
    create?: XOR<ActionLogCreateWithoutProjetInput, ActionLogUncheckedCreateWithoutProjetInput> | ActionLogCreateWithoutProjetInput[] | ActionLogUncheckedCreateWithoutProjetInput[]
    connectOrCreate?: ActionLogCreateOrConnectWithoutProjetInput | ActionLogCreateOrConnectWithoutProjetInput[]
    upsert?: ActionLogUpsertWithWhereUniqueWithoutProjetInput | ActionLogUpsertWithWhereUniqueWithoutProjetInput[]
    createMany?: ActionLogCreateManyProjetInputEnvelope
    set?: ActionLogWhereUniqueInput | ActionLogWhereUniqueInput[]
    disconnect?: ActionLogWhereUniqueInput | ActionLogWhereUniqueInput[]
    delete?: ActionLogWhereUniqueInput | ActionLogWhereUniqueInput[]
    connect?: ActionLogWhereUniqueInput | ActionLogWhereUniqueInput[]
    update?: ActionLogUpdateWithWhereUniqueWithoutProjetInput | ActionLogUpdateWithWhereUniqueWithoutProjetInput[]
    updateMany?: ActionLogUpdateManyWithWhereWithoutProjetInput | ActionLogUpdateManyWithWhereWithoutProjetInput[]
    deleteMany?: ActionLogScalarWhereInput | ActionLogScalarWhereInput[]
  }

  export type ProjetCreateNestedOneWithoutEcheancesInput = {
    create?: XOR<ProjetCreateWithoutEcheancesInput, ProjetUncheckedCreateWithoutEcheancesInput>
    connectOrCreate?: ProjetCreateOrConnectWithoutEcheancesInput
    connect?: ProjetWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProjetUpdateOneRequiredWithoutEcheancesNestedInput = {
    create?: XOR<ProjetCreateWithoutEcheancesInput, ProjetUncheckedCreateWithoutEcheancesInput>
    connectOrCreate?: ProjetCreateOrConnectWithoutEcheancesInput
    upsert?: ProjetUpsertWithoutEcheancesInput
    connect?: ProjetWhereUniqueInput
    update?: XOR<XOR<ProjetUpdateToOneWithWhereWithoutEcheancesInput, ProjetUpdateWithoutEcheancesInput>, ProjetUncheckedUpdateWithoutEcheancesInput>
  }

  export type UserCreateNestedOneWithoutLogsInput = {
    create?: XOR<UserCreateWithoutLogsInput, UserUncheckedCreateWithoutLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLogsInput
    connect?: UserWhereUniqueInput
  }

  export type ProjetCreateNestedOneWithoutLogsInput = {
    create?: XOR<ProjetCreateWithoutLogsInput, ProjetUncheckedCreateWithoutLogsInput>
    connectOrCreate?: ProjetCreateOrConnectWithoutLogsInput
    connect?: ProjetWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutLogsNestedInput = {
    create?: XOR<UserCreateWithoutLogsInput, UserUncheckedCreateWithoutLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLogsInput
    upsert?: UserUpsertWithoutLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLogsInput, UserUpdateWithoutLogsInput>, UserUncheckedUpdateWithoutLogsInput>
  }

  export type ProjetUpdateOneWithoutLogsNestedInput = {
    create?: XOR<ProjetCreateWithoutLogsInput, ProjetUncheckedCreateWithoutLogsInput>
    connectOrCreate?: ProjetCreateOrConnectWithoutLogsInput
    upsert?: ProjetUpsertWithoutLogsInput
    disconnect?: boolean
    delete?: ProjetWhereInput | boolean
    connect?: ProjetWhereUniqueInput
    update?: XOR<XOR<ProjetUpdateToOneWithWhereWithoutLogsInput, ProjetUpdateWithoutLogsInput>, ProjetUncheckedUpdateWithoutLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedEnumTypeProjetFilter<$PrismaModel = never> = {
    equals?: $Enums.TypeProjet | EnumTypeProjetFieldRefInput<$PrismaModel>
    in?: $Enums.TypeProjet[] | ListEnumTypeProjetFieldRefInput<$PrismaModel>
    notIn?: $Enums.TypeProjet[] | ListEnumTypeProjetFieldRefInput<$PrismaModel>
    not?: NestedEnumTypeProjetFilter<$PrismaModel> | $Enums.TypeProjet
  }

  export type NestedEnumEtatDossierFilter<$PrismaModel = never> = {
    equals?: $Enums.EtatDossier | EnumEtatDossierFieldRefInput<$PrismaModel>
    in?: $Enums.EtatDossier[] | ListEnumEtatDossierFieldRefInput<$PrismaModel>
    notIn?: $Enums.EtatDossier[] | ListEnumEtatDossierFieldRefInput<$PrismaModel>
    not?: NestedEnumEtatDossierFilter<$PrismaModel> | $Enums.EtatDossier
  }

  export type NestedEnumClassementDossierFilter<$PrismaModel = never> = {
    equals?: $Enums.ClassementDossier | EnumClassementDossierFieldRefInput<$PrismaModel>
    in?: $Enums.ClassementDossier[] | ListEnumClassementDossierFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClassementDossier[] | ListEnumClassementDossierFieldRefInput<$PrismaModel>
    not?: NestedEnumClassementDossierFilter<$PrismaModel> | $Enums.ClassementDossier
  }

  export type NestedEnumStatutApprobationFilter<$PrismaModel = never> = {
    equals?: $Enums.StatutApprobation | EnumStatutApprobationFieldRefInput<$PrismaModel>
    in?: $Enums.StatutApprobation[] | ListEnumStatutApprobationFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatutApprobation[] | ListEnumStatutApprobationFieldRefInput<$PrismaModel>
    not?: NestedEnumStatutApprobationFilter<$PrismaModel> | $Enums.StatutApprobation
  }

  export type NestedEnumTypeContratNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.TypeContrat | EnumTypeContratFieldRefInput<$PrismaModel> | null
    in?: $Enums.TypeContrat[] | ListEnumTypeContratFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.TypeContrat[] | ListEnumTypeContratFieldRefInput<$PrismaModel> | null
    not?: NestedEnumTypeContratNullableFilter<$PrismaModel> | $Enums.TypeContrat | null
    isSet?: boolean
  }

  export type NestedEnumTypeCompteurNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.TypeCompteur | EnumTypeCompteurFieldRefInput<$PrismaModel> | null
    in?: $Enums.TypeCompteur[] | ListEnumTypeCompteurFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.TypeCompteur[] | ListEnumTypeCompteurFieldRefInput<$PrismaModel> | null
    not?: NestedEnumTypeCompteurNullableFilter<$PrismaModel> | $Enums.TypeCompteur | null
    isSet?: boolean
  }

  export type NestedEnumTypeProjetWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TypeProjet | EnumTypeProjetFieldRefInput<$PrismaModel>
    in?: $Enums.TypeProjet[] | ListEnumTypeProjetFieldRefInput<$PrismaModel>
    notIn?: $Enums.TypeProjet[] | ListEnumTypeProjetFieldRefInput<$PrismaModel>
    not?: NestedEnumTypeProjetWithAggregatesFilter<$PrismaModel> | $Enums.TypeProjet
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTypeProjetFilter<$PrismaModel>
    _max?: NestedEnumTypeProjetFilter<$PrismaModel>
  }

  export type NestedEnumEtatDossierWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EtatDossier | EnumEtatDossierFieldRefInput<$PrismaModel>
    in?: $Enums.EtatDossier[] | ListEnumEtatDossierFieldRefInput<$PrismaModel>
    notIn?: $Enums.EtatDossier[] | ListEnumEtatDossierFieldRefInput<$PrismaModel>
    not?: NestedEnumEtatDossierWithAggregatesFilter<$PrismaModel> | $Enums.EtatDossier
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEtatDossierFilter<$PrismaModel>
    _max?: NestedEnumEtatDossierFilter<$PrismaModel>
  }

  export type NestedEnumClassementDossierWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ClassementDossier | EnumClassementDossierFieldRefInput<$PrismaModel>
    in?: $Enums.ClassementDossier[] | ListEnumClassementDossierFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClassementDossier[] | ListEnumClassementDossierFieldRefInput<$PrismaModel>
    not?: NestedEnumClassementDossierWithAggregatesFilter<$PrismaModel> | $Enums.ClassementDossier
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumClassementDossierFilter<$PrismaModel>
    _max?: NestedEnumClassementDossierFilter<$PrismaModel>
  }

  export type NestedEnumStatutApprobationWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatutApprobation | EnumStatutApprobationFieldRefInput<$PrismaModel>
    in?: $Enums.StatutApprobation[] | ListEnumStatutApprobationFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatutApprobation[] | ListEnumStatutApprobationFieldRefInput<$PrismaModel>
    not?: NestedEnumStatutApprobationWithAggregatesFilter<$PrismaModel> | $Enums.StatutApprobation
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatutApprobationFilter<$PrismaModel>
    _max?: NestedEnumStatutApprobationFilter<$PrismaModel>
  }

  export type NestedEnumTypeContratNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TypeContrat | EnumTypeContratFieldRefInput<$PrismaModel> | null
    in?: $Enums.TypeContrat[] | ListEnumTypeContratFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.TypeContrat[] | ListEnumTypeContratFieldRefInput<$PrismaModel> | null
    not?: NestedEnumTypeContratNullableWithAggregatesFilter<$PrismaModel> | $Enums.TypeContrat | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumTypeContratNullableFilter<$PrismaModel>
    _max?: NestedEnumTypeContratNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedEnumTypeCompteurNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TypeCompteur | EnumTypeCompteurFieldRefInput<$PrismaModel> | null
    in?: $Enums.TypeCompteur[] | ListEnumTypeCompteurFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.TypeCompteur[] | ListEnumTypeCompteurFieldRefInput<$PrismaModel> | null
    not?: NestedEnumTypeCompteurNullableWithAggregatesFilter<$PrismaModel> | $Enums.TypeCompteur | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumTypeCompteurNullableFilter<$PrismaModel>
    _max?: NestedEnumTypeCompteurNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    isSet?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    refreshToken: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    refreshToken: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
  }

  export type ProjetCreateWithoutAgentCommercialInput = {
    id?: string
    codeBarres?: string | null
    reference: string
    abonnes: string
    email?: string | null
    cin?: string | null
    contact?: string | null
    coordonneesGps?: string | null
    adresseLieuImplantation?: string | null
    presenteParMF?: string | null
    district?: string | null
    gouvernorat?: string | null
    delegation?: string | null
    municipalite?: string | null
    typeProjet?: $Enums.TypeProjet
    etatDossier?: $Enums.EtatDossier
    classementDossier?: $Enums.ClassementDossier
    commentaire?: string | null
    approbationCommerciale?: $Enums.StatutApprobation
    approbationTechnique?: $Enums.StatutApprobation
    executionInstallation?: string | null
    reception?: string | null
    procesVerbal?: string | null
    contratAchat?: $Enums.TypeContrat | null
    montantFinancement?: string | null
    tauxInteret?: string | null
    banque?: string | null
    agentCommercialAutre?: string | null
    puissanceInstallee?: string | null
    typeCompteur?: $Enums.TypeCompteur | null
    numeroCompteur?: string | null
    calibreDisjoncteur?: string | null
    puissanceSouscrite?: string | null
    productionPrevisionnelle?: string | null
    consommationAnnuelle?: string | null
    nbModules?: number | null
    puUnitairePV?: string | null
    marquePV?: string | null
    modelePV?: string | null
    nbOnduleurs?: number | null
    puUnitaireOnd?: string | null
    puOndSiAutreW?: string | null
    marqueOnd?: string | null
    modeleOnd?: string | null
    autreModeleOnd?: string | null
    equipementSurMesure?: string | null
    interventionSurMesure?: string | null
    rapportPuissance?: string | null
    dateDepotDossier?: Date | string | null
    dateApprobation?: Date | string | null
    dateInstallation?: Date | string | null
    dateDepotDemandeMES?: Date | string | null
    datePaiementPoseCompteurProsol?: Date | string | null
    dateMES?: Date | string | null
    nPolice?: string | null
    nLotDebProsol?: string | null
    saisieProsol?: string | null
    nLotDeblocageSubvention?: string | null
    deblocageProsol?: string | null
    conditionSubvention?: string | null
    saisieSubvention?: string | null
    deblocageSubvention?: string | null
    nDevis?: string | null
    dateDevis?: Date | string | null
    nFacture?: string | null
    dateFacture?: Date | string | null
    montantHT?: string | null
    tva?: string | null
    montantTTC?: string | null
    montantTTCFinal?: string | null
    montantAutofinancement?: string | null
    fraisPoseCmptProsol?: string | null
    paiement1erFactureSTEG?: string | null
    paiement2emeFactureSTEG?: string | null
    fraisAugmentationCalibre?: string | null
    fraisMutationElec?: string | null
    fraisMutationGaz?: string | null
    fraisPassageMonoTri?: string | null
    autresFrais?: string | null
    reglementClient?: string | null
    resteAPayer?: string | null
    subventionDemandee?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    echeances?: EcheanceCreateNestedManyWithoutProjetInput
    logs?: ActionLogCreateNestedManyWithoutProjetInput
  }

  export type ProjetUncheckedCreateWithoutAgentCommercialInput = {
    id?: string
    codeBarres?: string | null
    reference: string
    abonnes: string
    email?: string | null
    cin?: string | null
    contact?: string | null
    coordonneesGps?: string | null
    adresseLieuImplantation?: string | null
    presenteParMF?: string | null
    district?: string | null
    gouvernorat?: string | null
    delegation?: string | null
    municipalite?: string | null
    typeProjet?: $Enums.TypeProjet
    etatDossier?: $Enums.EtatDossier
    classementDossier?: $Enums.ClassementDossier
    commentaire?: string | null
    approbationCommerciale?: $Enums.StatutApprobation
    approbationTechnique?: $Enums.StatutApprobation
    executionInstallation?: string | null
    reception?: string | null
    procesVerbal?: string | null
    contratAchat?: $Enums.TypeContrat | null
    montantFinancement?: string | null
    tauxInteret?: string | null
    banque?: string | null
    agentCommercialAutre?: string | null
    puissanceInstallee?: string | null
    typeCompteur?: $Enums.TypeCompteur | null
    numeroCompteur?: string | null
    calibreDisjoncteur?: string | null
    puissanceSouscrite?: string | null
    productionPrevisionnelle?: string | null
    consommationAnnuelle?: string | null
    nbModules?: number | null
    puUnitairePV?: string | null
    marquePV?: string | null
    modelePV?: string | null
    nbOnduleurs?: number | null
    puUnitaireOnd?: string | null
    puOndSiAutreW?: string | null
    marqueOnd?: string | null
    modeleOnd?: string | null
    autreModeleOnd?: string | null
    equipementSurMesure?: string | null
    interventionSurMesure?: string | null
    rapportPuissance?: string | null
    dateDepotDossier?: Date | string | null
    dateApprobation?: Date | string | null
    dateInstallation?: Date | string | null
    dateDepotDemandeMES?: Date | string | null
    datePaiementPoseCompteurProsol?: Date | string | null
    dateMES?: Date | string | null
    nPolice?: string | null
    nLotDebProsol?: string | null
    saisieProsol?: string | null
    nLotDeblocageSubvention?: string | null
    deblocageProsol?: string | null
    conditionSubvention?: string | null
    saisieSubvention?: string | null
    deblocageSubvention?: string | null
    nDevis?: string | null
    dateDevis?: Date | string | null
    nFacture?: string | null
    dateFacture?: Date | string | null
    montantHT?: string | null
    tva?: string | null
    montantTTC?: string | null
    montantTTCFinal?: string | null
    montantAutofinancement?: string | null
    fraisPoseCmptProsol?: string | null
    paiement1erFactureSTEG?: string | null
    paiement2emeFactureSTEG?: string | null
    fraisAugmentationCalibre?: string | null
    fraisMutationElec?: string | null
    fraisMutationGaz?: string | null
    fraisPassageMonoTri?: string | null
    autresFrais?: string | null
    reglementClient?: string | null
    resteAPayer?: string | null
    subventionDemandee?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    echeances?: EcheanceUncheckedCreateNestedManyWithoutProjetInput
    logs?: ActionLogUncheckedCreateNestedManyWithoutProjetInput
  }

  export type ProjetCreateOrConnectWithoutAgentCommercialInput = {
    where: ProjetWhereUniqueInput
    create: XOR<ProjetCreateWithoutAgentCommercialInput, ProjetUncheckedCreateWithoutAgentCommercialInput>
  }

  export type ProjetCreateManyAgentCommercialInputEnvelope = {
    data: ProjetCreateManyAgentCommercialInput | ProjetCreateManyAgentCommercialInput[]
  }

  export type ActionLogCreateWithoutUserInput = {
    id?: string
    action: string
    details?: InputJsonValue | null
    createdAt?: Date | string
    projet?: ProjetCreateNestedOneWithoutLogsInput
  }

  export type ActionLogUncheckedCreateWithoutUserInput = {
    id?: string
    projetId?: string | null
    action: string
    details?: InputJsonValue | null
    createdAt?: Date | string
  }

  export type ActionLogCreateOrConnectWithoutUserInput = {
    where: ActionLogWhereUniqueInput
    create: XOR<ActionLogCreateWithoutUserInput, ActionLogUncheckedCreateWithoutUserInput>
  }

  export type ActionLogCreateManyUserInputEnvelope = {
    data: ActionLogCreateManyUserInput | ActionLogCreateManyUserInput[]
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    refreshToken?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
  }

  export type ProjetUpsertWithWhereUniqueWithoutAgentCommercialInput = {
    where: ProjetWhereUniqueInput
    update: XOR<ProjetUpdateWithoutAgentCommercialInput, ProjetUncheckedUpdateWithoutAgentCommercialInput>
    create: XOR<ProjetCreateWithoutAgentCommercialInput, ProjetUncheckedCreateWithoutAgentCommercialInput>
  }

  export type ProjetUpdateWithWhereUniqueWithoutAgentCommercialInput = {
    where: ProjetWhereUniqueInput
    data: XOR<ProjetUpdateWithoutAgentCommercialInput, ProjetUncheckedUpdateWithoutAgentCommercialInput>
  }

  export type ProjetUpdateManyWithWhereWithoutAgentCommercialInput = {
    where: ProjetScalarWhereInput
    data: XOR<ProjetUpdateManyMutationInput, ProjetUncheckedUpdateManyWithoutAgentCommercialInput>
  }

  export type ProjetScalarWhereInput = {
    AND?: ProjetScalarWhereInput | ProjetScalarWhereInput[]
    OR?: ProjetScalarWhereInput[]
    NOT?: ProjetScalarWhereInput | ProjetScalarWhereInput[]
    id?: StringFilter<"Projet"> | string
    codeBarres?: StringNullableFilter<"Projet"> | string | null
    reference?: StringFilter<"Projet"> | string
    abonnes?: StringFilter<"Projet"> | string
    email?: StringNullableFilter<"Projet"> | string | null
    cin?: StringNullableFilter<"Projet"> | string | null
    contact?: StringNullableFilter<"Projet"> | string | null
    coordonneesGps?: StringNullableFilter<"Projet"> | string | null
    adresseLieuImplantation?: StringNullableFilter<"Projet"> | string | null
    presenteParMF?: StringNullableFilter<"Projet"> | string | null
    district?: StringNullableFilter<"Projet"> | string | null
    gouvernorat?: StringNullableFilter<"Projet"> | string | null
    delegation?: StringNullableFilter<"Projet"> | string | null
    municipalite?: StringNullableFilter<"Projet"> | string | null
    typeProjet?: EnumTypeProjetFilter<"Projet"> | $Enums.TypeProjet
    etatDossier?: EnumEtatDossierFilter<"Projet"> | $Enums.EtatDossier
    classementDossier?: EnumClassementDossierFilter<"Projet"> | $Enums.ClassementDossier
    commentaire?: StringNullableFilter<"Projet"> | string | null
    approbationCommerciale?: EnumStatutApprobationFilter<"Projet"> | $Enums.StatutApprobation
    approbationTechnique?: EnumStatutApprobationFilter<"Projet"> | $Enums.StatutApprobation
    executionInstallation?: StringNullableFilter<"Projet"> | string | null
    reception?: StringNullableFilter<"Projet"> | string | null
    procesVerbal?: StringNullableFilter<"Projet"> | string | null
    contratAchat?: EnumTypeContratNullableFilter<"Projet"> | $Enums.TypeContrat | null
    montantFinancement?: StringNullableFilter<"Projet"> | string | null
    tauxInteret?: StringNullableFilter<"Projet"> | string | null
    banque?: StringNullableFilter<"Projet"> | string | null
    agentCommercialId?: StringNullableFilter<"Projet"> | string | null
    agentCommercialAutre?: StringNullableFilter<"Projet"> | string | null
    puissanceInstallee?: StringNullableFilter<"Projet"> | string | null
    typeCompteur?: EnumTypeCompteurNullableFilter<"Projet"> | $Enums.TypeCompteur | null
    numeroCompteur?: StringNullableFilter<"Projet"> | string | null
    calibreDisjoncteur?: StringNullableFilter<"Projet"> | string | null
    puissanceSouscrite?: StringNullableFilter<"Projet"> | string | null
    productionPrevisionnelle?: StringNullableFilter<"Projet"> | string | null
    consommationAnnuelle?: StringNullableFilter<"Projet"> | string | null
    nbModules?: IntNullableFilter<"Projet"> | number | null
    puUnitairePV?: StringNullableFilter<"Projet"> | string | null
    marquePV?: StringNullableFilter<"Projet"> | string | null
    modelePV?: StringNullableFilter<"Projet"> | string | null
    nbOnduleurs?: IntNullableFilter<"Projet"> | number | null
    puUnitaireOnd?: StringNullableFilter<"Projet"> | string | null
    puOndSiAutreW?: StringNullableFilter<"Projet"> | string | null
    marqueOnd?: StringNullableFilter<"Projet"> | string | null
    modeleOnd?: StringNullableFilter<"Projet"> | string | null
    autreModeleOnd?: StringNullableFilter<"Projet"> | string | null
    equipementSurMesure?: StringNullableFilter<"Projet"> | string | null
    interventionSurMesure?: StringNullableFilter<"Projet"> | string | null
    rapportPuissance?: StringNullableFilter<"Projet"> | string | null
    dateDepotDossier?: DateTimeNullableFilter<"Projet"> | Date | string | null
    dateApprobation?: DateTimeNullableFilter<"Projet"> | Date | string | null
    dateInstallation?: DateTimeNullableFilter<"Projet"> | Date | string | null
    dateDepotDemandeMES?: DateTimeNullableFilter<"Projet"> | Date | string | null
    datePaiementPoseCompteurProsol?: DateTimeNullableFilter<"Projet"> | Date | string | null
    dateMES?: DateTimeNullableFilter<"Projet"> | Date | string | null
    nPolice?: StringNullableFilter<"Projet"> | string | null
    nLotDebProsol?: StringNullableFilter<"Projet"> | string | null
    saisieProsol?: StringNullableFilter<"Projet"> | string | null
    nLotDeblocageSubvention?: StringNullableFilter<"Projet"> | string | null
    deblocageProsol?: StringNullableFilter<"Projet"> | string | null
    conditionSubvention?: StringNullableFilter<"Projet"> | string | null
    saisieSubvention?: StringNullableFilter<"Projet"> | string | null
    deblocageSubvention?: StringNullableFilter<"Projet"> | string | null
    nDevis?: StringNullableFilter<"Projet"> | string | null
    dateDevis?: DateTimeNullableFilter<"Projet"> | Date | string | null
    nFacture?: StringNullableFilter<"Projet"> | string | null
    dateFacture?: DateTimeNullableFilter<"Projet"> | Date | string | null
    montantHT?: StringNullableFilter<"Projet"> | string | null
    tva?: StringNullableFilter<"Projet"> | string | null
    montantTTC?: StringNullableFilter<"Projet"> | string | null
    montantTTCFinal?: StringNullableFilter<"Projet"> | string | null
    montantAutofinancement?: StringNullableFilter<"Projet"> | string | null
    fraisPoseCmptProsol?: StringNullableFilter<"Projet"> | string | null
    paiement1erFactureSTEG?: StringNullableFilter<"Projet"> | string | null
    paiement2emeFactureSTEG?: StringNullableFilter<"Projet"> | string | null
    fraisAugmentationCalibre?: StringNullableFilter<"Projet"> | string | null
    fraisMutationElec?: StringNullableFilter<"Projet"> | string | null
    fraisMutationGaz?: StringNullableFilter<"Projet"> | string | null
    fraisPassageMonoTri?: StringNullableFilter<"Projet"> | string | null
    autresFrais?: StringNullableFilter<"Projet"> | string | null
    reglementClient?: StringNullableFilter<"Projet"> | string | null
    resteAPayer?: StringNullableFilter<"Projet"> | string | null
    subventionDemandee?: StringNullableFilter<"Projet"> | string | null
    createdAt?: DateTimeFilter<"Projet"> | Date | string
    updatedAt?: DateTimeFilter<"Projet"> | Date | string
  }

  export type ActionLogUpsertWithWhereUniqueWithoutUserInput = {
    where: ActionLogWhereUniqueInput
    update: XOR<ActionLogUpdateWithoutUserInput, ActionLogUncheckedUpdateWithoutUserInput>
    create: XOR<ActionLogCreateWithoutUserInput, ActionLogUncheckedCreateWithoutUserInput>
  }

  export type ActionLogUpdateWithWhereUniqueWithoutUserInput = {
    where: ActionLogWhereUniqueInput
    data: XOR<ActionLogUpdateWithoutUserInput, ActionLogUncheckedUpdateWithoutUserInput>
  }

  export type ActionLogUpdateManyWithWhereWithoutUserInput = {
    where: ActionLogScalarWhereInput
    data: XOR<ActionLogUpdateManyMutationInput, ActionLogUncheckedUpdateManyWithoutUserInput>
  }

  export type ActionLogScalarWhereInput = {
    AND?: ActionLogScalarWhereInput | ActionLogScalarWhereInput[]
    OR?: ActionLogScalarWhereInput[]
    NOT?: ActionLogScalarWhereInput | ActionLogScalarWhereInput[]
    id?: StringFilter<"ActionLog"> | string
    userId?: StringFilter<"ActionLog"> | string
    projetId?: StringNullableFilter<"ActionLog"> | string | null
    action?: StringFilter<"ActionLog"> | string
    details?: JsonNullableFilter<"ActionLog">
    createdAt?: DateTimeFilter<"ActionLog"> | Date | string
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    nom: string
    prenom: string
    email: string
    telephone?: string | null
    password: string
    role?: $Enums.Role
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    lastLoginAt?: Date | string | null
    projets?: ProjetCreateNestedManyWithoutAgentCommercialInput
    logs?: ActionLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    nom: string
    prenom: string
    email: string
    telephone?: string | null
    password: string
    role?: $Enums.Role
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    lastLoginAt?: Date | string | null
    projets?: ProjetUncheckedCreateNestedManyWithoutAgentCommercialInput
    logs?: ActionLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    projets?: ProjetUpdateManyWithoutAgentCommercialNestedInput
    logs?: ActionLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    projets?: ProjetUncheckedUpdateManyWithoutAgentCommercialNestedInput
    logs?: ActionLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutProjetsInput = {
    id?: string
    nom: string
    prenom: string
    email: string
    telephone?: string | null
    password: string
    role?: $Enums.Role
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    lastLoginAt?: Date | string | null
    sessions?: SessionCreateNestedManyWithoutUserInput
    logs?: ActionLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProjetsInput = {
    id?: string
    nom: string
    prenom: string
    email: string
    telephone?: string | null
    password: string
    role?: $Enums.Role
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    lastLoginAt?: Date | string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    logs?: ActionLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProjetsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProjetsInput, UserUncheckedCreateWithoutProjetsInput>
  }

  export type EcheanceCreateWithoutProjetInput = {
    id?: string
    numero: number
    montant?: string | null
    date?: Date | string | null
    modePaiement?: string | null
    description?: string | null
  }

  export type EcheanceUncheckedCreateWithoutProjetInput = {
    id?: string
    numero: number
    montant?: string | null
    date?: Date | string | null
    modePaiement?: string | null
    description?: string | null
  }

  export type EcheanceCreateOrConnectWithoutProjetInput = {
    where: EcheanceWhereUniqueInput
    create: XOR<EcheanceCreateWithoutProjetInput, EcheanceUncheckedCreateWithoutProjetInput>
  }

  export type EcheanceCreateManyProjetInputEnvelope = {
    data: EcheanceCreateManyProjetInput | EcheanceCreateManyProjetInput[]
  }

  export type ActionLogCreateWithoutProjetInput = {
    id?: string
    action: string
    details?: InputJsonValue | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutLogsInput
  }

  export type ActionLogUncheckedCreateWithoutProjetInput = {
    id?: string
    userId: string
    action: string
    details?: InputJsonValue | null
    createdAt?: Date | string
  }

  export type ActionLogCreateOrConnectWithoutProjetInput = {
    where: ActionLogWhereUniqueInput
    create: XOR<ActionLogCreateWithoutProjetInput, ActionLogUncheckedCreateWithoutProjetInput>
  }

  export type ActionLogCreateManyProjetInputEnvelope = {
    data: ActionLogCreateManyProjetInput | ActionLogCreateManyProjetInput[]
  }

  export type UserUpsertWithoutProjetsInput = {
    update: XOR<UserUpdateWithoutProjetsInput, UserUncheckedUpdateWithoutProjetsInput>
    create: XOR<UserCreateWithoutProjetsInput, UserUncheckedCreateWithoutProjetsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProjetsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProjetsInput, UserUncheckedUpdateWithoutProjetsInput>
  }

  export type UserUpdateWithoutProjetsInput = {
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUpdateManyWithoutUserNestedInput
    logs?: ActionLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProjetsInput = {
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    logs?: ActionLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type EcheanceUpsertWithWhereUniqueWithoutProjetInput = {
    where: EcheanceWhereUniqueInput
    update: XOR<EcheanceUpdateWithoutProjetInput, EcheanceUncheckedUpdateWithoutProjetInput>
    create: XOR<EcheanceCreateWithoutProjetInput, EcheanceUncheckedCreateWithoutProjetInput>
  }

  export type EcheanceUpdateWithWhereUniqueWithoutProjetInput = {
    where: EcheanceWhereUniqueInput
    data: XOR<EcheanceUpdateWithoutProjetInput, EcheanceUncheckedUpdateWithoutProjetInput>
  }

  export type EcheanceUpdateManyWithWhereWithoutProjetInput = {
    where: EcheanceScalarWhereInput
    data: XOR<EcheanceUpdateManyMutationInput, EcheanceUncheckedUpdateManyWithoutProjetInput>
  }

  export type EcheanceScalarWhereInput = {
    AND?: EcheanceScalarWhereInput | EcheanceScalarWhereInput[]
    OR?: EcheanceScalarWhereInput[]
    NOT?: EcheanceScalarWhereInput | EcheanceScalarWhereInput[]
    id?: StringFilter<"Echeance"> | string
    projetId?: StringFilter<"Echeance"> | string
    numero?: IntFilter<"Echeance"> | number
    montant?: StringNullableFilter<"Echeance"> | string | null
    date?: DateTimeNullableFilter<"Echeance"> | Date | string | null
    modePaiement?: StringNullableFilter<"Echeance"> | string | null
    description?: StringNullableFilter<"Echeance"> | string | null
  }

  export type ActionLogUpsertWithWhereUniqueWithoutProjetInput = {
    where: ActionLogWhereUniqueInput
    update: XOR<ActionLogUpdateWithoutProjetInput, ActionLogUncheckedUpdateWithoutProjetInput>
    create: XOR<ActionLogCreateWithoutProjetInput, ActionLogUncheckedCreateWithoutProjetInput>
  }

  export type ActionLogUpdateWithWhereUniqueWithoutProjetInput = {
    where: ActionLogWhereUniqueInput
    data: XOR<ActionLogUpdateWithoutProjetInput, ActionLogUncheckedUpdateWithoutProjetInput>
  }

  export type ActionLogUpdateManyWithWhereWithoutProjetInput = {
    where: ActionLogScalarWhereInput
    data: XOR<ActionLogUpdateManyMutationInput, ActionLogUncheckedUpdateManyWithoutProjetInput>
  }

  export type ProjetCreateWithoutEcheancesInput = {
    id?: string
    codeBarres?: string | null
    reference: string
    abonnes: string
    email?: string | null
    cin?: string | null
    contact?: string | null
    coordonneesGps?: string | null
    adresseLieuImplantation?: string | null
    presenteParMF?: string | null
    district?: string | null
    gouvernorat?: string | null
    delegation?: string | null
    municipalite?: string | null
    typeProjet?: $Enums.TypeProjet
    etatDossier?: $Enums.EtatDossier
    classementDossier?: $Enums.ClassementDossier
    commentaire?: string | null
    approbationCommerciale?: $Enums.StatutApprobation
    approbationTechnique?: $Enums.StatutApprobation
    executionInstallation?: string | null
    reception?: string | null
    procesVerbal?: string | null
    contratAchat?: $Enums.TypeContrat | null
    montantFinancement?: string | null
    tauxInteret?: string | null
    banque?: string | null
    agentCommercialAutre?: string | null
    puissanceInstallee?: string | null
    typeCompteur?: $Enums.TypeCompteur | null
    numeroCompteur?: string | null
    calibreDisjoncteur?: string | null
    puissanceSouscrite?: string | null
    productionPrevisionnelle?: string | null
    consommationAnnuelle?: string | null
    nbModules?: number | null
    puUnitairePV?: string | null
    marquePV?: string | null
    modelePV?: string | null
    nbOnduleurs?: number | null
    puUnitaireOnd?: string | null
    puOndSiAutreW?: string | null
    marqueOnd?: string | null
    modeleOnd?: string | null
    autreModeleOnd?: string | null
    equipementSurMesure?: string | null
    interventionSurMesure?: string | null
    rapportPuissance?: string | null
    dateDepotDossier?: Date | string | null
    dateApprobation?: Date | string | null
    dateInstallation?: Date | string | null
    dateDepotDemandeMES?: Date | string | null
    datePaiementPoseCompteurProsol?: Date | string | null
    dateMES?: Date | string | null
    nPolice?: string | null
    nLotDebProsol?: string | null
    saisieProsol?: string | null
    nLotDeblocageSubvention?: string | null
    deblocageProsol?: string | null
    conditionSubvention?: string | null
    saisieSubvention?: string | null
    deblocageSubvention?: string | null
    nDevis?: string | null
    dateDevis?: Date | string | null
    nFacture?: string | null
    dateFacture?: Date | string | null
    montantHT?: string | null
    tva?: string | null
    montantTTC?: string | null
    montantTTCFinal?: string | null
    montantAutofinancement?: string | null
    fraisPoseCmptProsol?: string | null
    paiement1erFactureSTEG?: string | null
    paiement2emeFactureSTEG?: string | null
    fraisAugmentationCalibre?: string | null
    fraisMutationElec?: string | null
    fraisMutationGaz?: string | null
    fraisPassageMonoTri?: string | null
    autresFrais?: string | null
    reglementClient?: string | null
    resteAPayer?: string | null
    subventionDemandee?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    agentCommercial?: UserCreateNestedOneWithoutProjetsInput
    logs?: ActionLogCreateNestedManyWithoutProjetInput
  }

  export type ProjetUncheckedCreateWithoutEcheancesInput = {
    id?: string
    codeBarres?: string | null
    reference: string
    abonnes: string
    email?: string | null
    cin?: string | null
    contact?: string | null
    coordonneesGps?: string | null
    adresseLieuImplantation?: string | null
    presenteParMF?: string | null
    district?: string | null
    gouvernorat?: string | null
    delegation?: string | null
    municipalite?: string | null
    typeProjet?: $Enums.TypeProjet
    etatDossier?: $Enums.EtatDossier
    classementDossier?: $Enums.ClassementDossier
    commentaire?: string | null
    approbationCommerciale?: $Enums.StatutApprobation
    approbationTechnique?: $Enums.StatutApprobation
    executionInstallation?: string | null
    reception?: string | null
    procesVerbal?: string | null
    contratAchat?: $Enums.TypeContrat | null
    montantFinancement?: string | null
    tauxInteret?: string | null
    banque?: string | null
    agentCommercialId?: string | null
    agentCommercialAutre?: string | null
    puissanceInstallee?: string | null
    typeCompteur?: $Enums.TypeCompteur | null
    numeroCompteur?: string | null
    calibreDisjoncteur?: string | null
    puissanceSouscrite?: string | null
    productionPrevisionnelle?: string | null
    consommationAnnuelle?: string | null
    nbModules?: number | null
    puUnitairePV?: string | null
    marquePV?: string | null
    modelePV?: string | null
    nbOnduleurs?: number | null
    puUnitaireOnd?: string | null
    puOndSiAutreW?: string | null
    marqueOnd?: string | null
    modeleOnd?: string | null
    autreModeleOnd?: string | null
    equipementSurMesure?: string | null
    interventionSurMesure?: string | null
    rapportPuissance?: string | null
    dateDepotDossier?: Date | string | null
    dateApprobation?: Date | string | null
    dateInstallation?: Date | string | null
    dateDepotDemandeMES?: Date | string | null
    datePaiementPoseCompteurProsol?: Date | string | null
    dateMES?: Date | string | null
    nPolice?: string | null
    nLotDebProsol?: string | null
    saisieProsol?: string | null
    nLotDeblocageSubvention?: string | null
    deblocageProsol?: string | null
    conditionSubvention?: string | null
    saisieSubvention?: string | null
    deblocageSubvention?: string | null
    nDevis?: string | null
    dateDevis?: Date | string | null
    nFacture?: string | null
    dateFacture?: Date | string | null
    montantHT?: string | null
    tva?: string | null
    montantTTC?: string | null
    montantTTCFinal?: string | null
    montantAutofinancement?: string | null
    fraisPoseCmptProsol?: string | null
    paiement1erFactureSTEG?: string | null
    paiement2emeFactureSTEG?: string | null
    fraisAugmentationCalibre?: string | null
    fraisMutationElec?: string | null
    fraisMutationGaz?: string | null
    fraisPassageMonoTri?: string | null
    autresFrais?: string | null
    reglementClient?: string | null
    resteAPayer?: string | null
    subventionDemandee?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    logs?: ActionLogUncheckedCreateNestedManyWithoutProjetInput
  }

  export type ProjetCreateOrConnectWithoutEcheancesInput = {
    where: ProjetWhereUniqueInput
    create: XOR<ProjetCreateWithoutEcheancesInput, ProjetUncheckedCreateWithoutEcheancesInput>
  }

  export type ProjetUpsertWithoutEcheancesInput = {
    update: XOR<ProjetUpdateWithoutEcheancesInput, ProjetUncheckedUpdateWithoutEcheancesInput>
    create: XOR<ProjetCreateWithoutEcheancesInput, ProjetUncheckedCreateWithoutEcheancesInput>
    where?: ProjetWhereInput
  }

  export type ProjetUpdateToOneWithWhereWithoutEcheancesInput = {
    where?: ProjetWhereInput
    data: XOR<ProjetUpdateWithoutEcheancesInput, ProjetUncheckedUpdateWithoutEcheancesInput>
  }

  export type ProjetUpdateWithoutEcheancesInput = {
    codeBarres?: NullableStringFieldUpdateOperationsInput | string | null
    reference?: StringFieldUpdateOperationsInput | string
    abonnes?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    cin?: NullableStringFieldUpdateOperationsInput | string | null
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    coordonneesGps?: NullableStringFieldUpdateOperationsInput | string | null
    adresseLieuImplantation?: NullableStringFieldUpdateOperationsInput | string | null
    presenteParMF?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    gouvernorat?: NullableStringFieldUpdateOperationsInput | string | null
    delegation?: NullableStringFieldUpdateOperationsInput | string | null
    municipalite?: NullableStringFieldUpdateOperationsInput | string | null
    typeProjet?: EnumTypeProjetFieldUpdateOperationsInput | $Enums.TypeProjet
    etatDossier?: EnumEtatDossierFieldUpdateOperationsInput | $Enums.EtatDossier
    classementDossier?: EnumClassementDossierFieldUpdateOperationsInput | $Enums.ClassementDossier
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    approbationCommerciale?: EnumStatutApprobationFieldUpdateOperationsInput | $Enums.StatutApprobation
    approbationTechnique?: EnumStatutApprobationFieldUpdateOperationsInput | $Enums.StatutApprobation
    executionInstallation?: NullableStringFieldUpdateOperationsInput | string | null
    reception?: NullableStringFieldUpdateOperationsInput | string | null
    procesVerbal?: NullableStringFieldUpdateOperationsInput | string | null
    contratAchat?: NullableEnumTypeContratFieldUpdateOperationsInput | $Enums.TypeContrat | null
    montantFinancement?: NullableStringFieldUpdateOperationsInput | string | null
    tauxInteret?: NullableStringFieldUpdateOperationsInput | string | null
    banque?: NullableStringFieldUpdateOperationsInput | string | null
    agentCommercialAutre?: NullableStringFieldUpdateOperationsInput | string | null
    puissanceInstallee?: NullableStringFieldUpdateOperationsInput | string | null
    typeCompteur?: NullableEnumTypeCompteurFieldUpdateOperationsInput | $Enums.TypeCompteur | null
    numeroCompteur?: NullableStringFieldUpdateOperationsInput | string | null
    calibreDisjoncteur?: NullableStringFieldUpdateOperationsInput | string | null
    puissanceSouscrite?: NullableStringFieldUpdateOperationsInput | string | null
    productionPrevisionnelle?: NullableStringFieldUpdateOperationsInput | string | null
    consommationAnnuelle?: NullableStringFieldUpdateOperationsInput | string | null
    nbModules?: NullableIntFieldUpdateOperationsInput | number | null
    puUnitairePV?: NullableStringFieldUpdateOperationsInput | string | null
    marquePV?: NullableStringFieldUpdateOperationsInput | string | null
    modelePV?: NullableStringFieldUpdateOperationsInput | string | null
    nbOnduleurs?: NullableIntFieldUpdateOperationsInput | number | null
    puUnitaireOnd?: NullableStringFieldUpdateOperationsInput | string | null
    puOndSiAutreW?: NullableStringFieldUpdateOperationsInput | string | null
    marqueOnd?: NullableStringFieldUpdateOperationsInput | string | null
    modeleOnd?: NullableStringFieldUpdateOperationsInput | string | null
    autreModeleOnd?: NullableStringFieldUpdateOperationsInput | string | null
    equipementSurMesure?: NullableStringFieldUpdateOperationsInput | string | null
    interventionSurMesure?: NullableStringFieldUpdateOperationsInput | string | null
    rapportPuissance?: NullableStringFieldUpdateOperationsInput | string | null
    dateDepotDossier?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateApprobation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateInstallation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateDepotDemandeMES?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    datePaiementPoseCompteurProsol?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateMES?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nPolice?: NullableStringFieldUpdateOperationsInput | string | null
    nLotDebProsol?: NullableStringFieldUpdateOperationsInput | string | null
    saisieProsol?: NullableStringFieldUpdateOperationsInput | string | null
    nLotDeblocageSubvention?: NullableStringFieldUpdateOperationsInput | string | null
    deblocageProsol?: NullableStringFieldUpdateOperationsInput | string | null
    conditionSubvention?: NullableStringFieldUpdateOperationsInput | string | null
    saisieSubvention?: NullableStringFieldUpdateOperationsInput | string | null
    deblocageSubvention?: NullableStringFieldUpdateOperationsInput | string | null
    nDevis?: NullableStringFieldUpdateOperationsInput | string | null
    dateDevis?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nFacture?: NullableStringFieldUpdateOperationsInput | string | null
    dateFacture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    montantHT?: NullableStringFieldUpdateOperationsInput | string | null
    tva?: NullableStringFieldUpdateOperationsInput | string | null
    montantTTC?: NullableStringFieldUpdateOperationsInput | string | null
    montantTTCFinal?: NullableStringFieldUpdateOperationsInput | string | null
    montantAutofinancement?: NullableStringFieldUpdateOperationsInput | string | null
    fraisPoseCmptProsol?: NullableStringFieldUpdateOperationsInput | string | null
    paiement1erFactureSTEG?: NullableStringFieldUpdateOperationsInput | string | null
    paiement2emeFactureSTEG?: NullableStringFieldUpdateOperationsInput | string | null
    fraisAugmentationCalibre?: NullableStringFieldUpdateOperationsInput | string | null
    fraisMutationElec?: NullableStringFieldUpdateOperationsInput | string | null
    fraisMutationGaz?: NullableStringFieldUpdateOperationsInput | string | null
    fraisPassageMonoTri?: NullableStringFieldUpdateOperationsInput | string | null
    autresFrais?: NullableStringFieldUpdateOperationsInput | string | null
    reglementClient?: NullableStringFieldUpdateOperationsInput | string | null
    resteAPayer?: NullableStringFieldUpdateOperationsInput | string | null
    subventionDemandee?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agentCommercial?: UserUpdateOneWithoutProjetsNestedInput
    logs?: ActionLogUpdateManyWithoutProjetNestedInput
  }

  export type ProjetUncheckedUpdateWithoutEcheancesInput = {
    codeBarres?: NullableStringFieldUpdateOperationsInput | string | null
    reference?: StringFieldUpdateOperationsInput | string
    abonnes?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    cin?: NullableStringFieldUpdateOperationsInput | string | null
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    coordonneesGps?: NullableStringFieldUpdateOperationsInput | string | null
    adresseLieuImplantation?: NullableStringFieldUpdateOperationsInput | string | null
    presenteParMF?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    gouvernorat?: NullableStringFieldUpdateOperationsInput | string | null
    delegation?: NullableStringFieldUpdateOperationsInput | string | null
    municipalite?: NullableStringFieldUpdateOperationsInput | string | null
    typeProjet?: EnumTypeProjetFieldUpdateOperationsInput | $Enums.TypeProjet
    etatDossier?: EnumEtatDossierFieldUpdateOperationsInput | $Enums.EtatDossier
    classementDossier?: EnumClassementDossierFieldUpdateOperationsInput | $Enums.ClassementDossier
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    approbationCommerciale?: EnumStatutApprobationFieldUpdateOperationsInput | $Enums.StatutApprobation
    approbationTechnique?: EnumStatutApprobationFieldUpdateOperationsInput | $Enums.StatutApprobation
    executionInstallation?: NullableStringFieldUpdateOperationsInput | string | null
    reception?: NullableStringFieldUpdateOperationsInput | string | null
    procesVerbal?: NullableStringFieldUpdateOperationsInput | string | null
    contratAchat?: NullableEnumTypeContratFieldUpdateOperationsInput | $Enums.TypeContrat | null
    montantFinancement?: NullableStringFieldUpdateOperationsInput | string | null
    tauxInteret?: NullableStringFieldUpdateOperationsInput | string | null
    banque?: NullableStringFieldUpdateOperationsInput | string | null
    agentCommercialId?: NullableStringFieldUpdateOperationsInput | string | null
    agentCommercialAutre?: NullableStringFieldUpdateOperationsInput | string | null
    puissanceInstallee?: NullableStringFieldUpdateOperationsInput | string | null
    typeCompteur?: NullableEnumTypeCompteurFieldUpdateOperationsInput | $Enums.TypeCompteur | null
    numeroCompteur?: NullableStringFieldUpdateOperationsInput | string | null
    calibreDisjoncteur?: NullableStringFieldUpdateOperationsInput | string | null
    puissanceSouscrite?: NullableStringFieldUpdateOperationsInput | string | null
    productionPrevisionnelle?: NullableStringFieldUpdateOperationsInput | string | null
    consommationAnnuelle?: NullableStringFieldUpdateOperationsInput | string | null
    nbModules?: NullableIntFieldUpdateOperationsInput | number | null
    puUnitairePV?: NullableStringFieldUpdateOperationsInput | string | null
    marquePV?: NullableStringFieldUpdateOperationsInput | string | null
    modelePV?: NullableStringFieldUpdateOperationsInput | string | null
    nbOnduleurs?: NullableIntFieldUpdateOperationsInput | number | null
    puUnitaireOnd?: NullableStringFieldUpdateOperationsInput | string | null
    puOndSiAutreW?: NullableStringFieldUpdateOperationsInput | string | null
    marqueOnd?: NullableStringFieldUpdateOperationsInput | string | null
    modeleOnd?: NullableStringFieldUpdateOperationsInput | string | null
    autreModeleOnd?: NullableStringFieldUpdateOperationsInput | string | null
    equipementSurMesure?: NullableStringFieldUpdateOperationsInput | string | null
    interventionSurMesure?: NullableStringFieldUpdateOperationsInput | string | null
    rapportPuissance?: NullableStringFieldUpdateOperationsInput | string | null
    dateDepotDossier?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateApprobation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateInstallation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateDepotDemandeMES?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    datePaiementPoseCompteurProsol?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateMES?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nPolice?: NullableStringFieldUpdateOperationsInput | string | null
    nLotDebProsol?: NullableStringFieldUpdateOperationsInput | string | null
    saisieProsol?: NullableStringFieldUpdateOperationsInput | string | null
    nLotDeblocageSubvention?: NullableStringFieldUpdateOperationsInput | string | null
    deblocageProsol?: NullableStringFieldUpdateOperationsInput | string | null
    conditionSubvention?: NullableStringFieldUpdateOperationsInput | string | null
    saisieSubvention?: NullableStringFieldUpdateOperationsInput | string | null
    deblocageSubvention?: NullableStringFieldUpdateOperationsInput | string | null
    nDevis?: NullableStringFieldUpdateOperationsInput | string | null
    dateDevis?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nFacture?: NullableStringFieldUpdateOperationsInput | string | null
    dateFacture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    montantHT?: NullableStringFieldUpdateOperationsInput | string | null
    tva?: NullableStringFieldUpdateOperationsInput | string | null
    montantTTC?: NullableStringFieldUpdateOperationsInput | string | null
    montantTTCFinal?: NullableStringFieldUpdateOperationsInput | string | null
    montantAutofinancement?: NullableStringFieldUpdateOperationsInput | string | null
    fraisPoseCmptProsol?: NullableStringFieldUpdateOperationsInput | string | null
    paiement1erFactureSTEG?: NullableStringFieldUpdateOperationsInput | string | null
    paiement2emeFactureSTEG?: NullableStringFieldUpdateOperationsInput | string | null
    fraisAugmentationCalibre?: NullableStringFieldUpdateOperationsInput | string | null
    fraisMutationElec?: NullableStringFieldUpdateOperationsInput | string | null
    fraisMutationGaz?: NullableStringFieldUpdateOperationsInput | string | null
    fraisPassageMonoTri?: NullableStringFieldUpdateOperationsInput | string | null
    autresFrais?: NullableStringFieldUpdateOperationsInput | string | null
    reglementClient?: NullableStringFieldUpdateOperationsInput | string | null
    resteAPayer?: NullableStringFieldUpdateOperationsInput | string | null
    subventionDemandee?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logs?: ActionLogUncheckedUpdateManyWithoutProjetNestedInput
  }

  export type UserCreateWithoutLogsInput = {
    id?: string
    nom: string
    prenom: string
    email: string
    telephone?: string | null
    password: string
    role?: $Enums.Role
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    lastLoginAt?: Date | string | null
    sessions?: SessionCreateNestedManyWithoutUserInput
    projets?: ProjetCreateNestedManyWithoutAgentCommercialInput
  }

  export type UserUncheckedCreateWithoutLogsInput = {
    id?: string
    nom: string
    prenom: string
    email: string
    telephone?: string | null
    password: string
    role?: $Enums.Role
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    lastLoginAt?: Date | string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    projets?: ProjetUncheckedCreateNestedManyWithoutAgentCommercialInput
  }

  export type UserCreateOrConnectWithoutLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLogsInput, UserUncheckedCreateWithoutLogsInput>
  }

  export type ProjetCreateWithoutLogsInput = {
    id?: string
    codeBarres?: string | null
    reference: string
    abonnes: string
    email?: string | null
    cin?: string | null
    contact?: string | null
    coordonneesGps?: string | null
    adresseLieuImplantation?: string | null
    presenteParMF?: string | null
    district?: string | null
    gouvernorat?: string | null
    delegation?: string | null
    municipalite?: string | null
    typeProjet?: $Enums.TypeProjet
    etatDossier?: $Enums.EtatDossier
    classementDossier?: $Enums.ClassementDossier
    commentaire?: string | null
    approbationCommerciale?: $Enums.StatutApprobation
    approbationTechnique?: $Enums.StatutApprobation
    executionInstallation?: string | null
    reception?: string | null
    procesVerbal?: string | null
    contratAchat?: $Enums.TypeContrat | null
    montantFinancement?: string | null
    tauxInteret?: string | null
    banque?: string | null
    agentCommercialAutre?: string | null
    puissanceInstallee?: string | null
    typeCompteur?: $Enums.TypeCompteur | null
    numeroCompteur?: string | null
    calibreDisjoncteur?: string | null
    puissanceSouscrite?: string | null
    productionPrevisionnelle?: string | null
    consommationAnnuelle?: string | null
    nbModules?: number | null
    puUnitairePV?: string | null
    marquePV?: string | null
    modelePV?: string | null
    nbOnduleurs?: number | null
    puUnitaireOnd?: string | null
    puOndSiAutreW?: string | null
    marqueOnd?: string | null
    modeleOnd?: string | null
    autreModeleOnd?: string | null
    equipementSurMesure?: string | null
    interventionSurMesure?: string | null
    rapportPuissance?: string | null
    dateDepotDossier?: Date | string | null
    dateApprobation?: Date | string | null
    dateInstallation?: Date | string | null
    dateDepotDemandeMES?: Date | string | null
    datePaiementPoseCompteurProsol?: Date | string | null
    dateMES?: Date | string | null
    nPolice?: string | null
    nLotDebProsol?: string | null
    saisieProsol?: string | null
    nLotDeblocageSubvention?: string | null
    deblocageProsol?: string | null
    conditionSubvention?: string | null
    saisieSubvention?: string | null
    deblocageSubvention?: string | null
    nDevis?: string | null
    dateDevis?: Date | string | null
    nFacture?: string | null
    dateFacture?: Date | string | null
    montantHT?: string | null
    tva?: string | null
    montantTTC?: string | null
    montantTTCFinal?: string | null
    montantAutofinancement?: string | null
    fraisPoseCmptProsol?: string | null
    paiement1erFactureSTEG?: string | null
    paiement2emeFactureSTEG?: string | null
    fraisAugmentationCalibre?: string | null
    fraisMutationElec?: string | null
    fraisMutationGaz?: string | null
    fraisPassageMonoTri?: string | null
    autresFrais?: string | null
    reglementClient?: string | null
    resteAPayer?: string | null
    subventionDemandee?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    agentCommercial?: UserCreateNestedOneWithoutProjetsInput
    echeances?: EcheanceCreateNestedManyWithoutProjetInput
  }

  export type ProjetUncheckedCreateWithoutLogsInput = {
    id?: string
    codeBarres?: string | null
    reference: string
    abonnes: string
    email?: string | null
    cin?: string | null
    contact?: string | null
    coordonneesGps?: string | null
    adresseLieuImplantation?: string | null
    presenteParMF?: string | null
    district?: string | null
    gouvernorat?: string | null
    delegation?: string | null
    municipalite?: string | null
    typeProjet?: $Enums.TypeProjet
    etatDossier?: $Enums.EtatDossier
    classementDossier?: $Enums.ClassementDossier
    commentaire?: string | null
    approbationCommerciale?: $Enums.StatutApprobation
    approbationTechnique?: $Enums.StatutApprobation
    executionInstallation?: string | null
    reception?: string | null
    procesVerbal?: string | null
    contratAchat?: $Enums.TypeContrat | null
    montantFinancement?: string | null
    tauxInteret?: string | null
    banque?: string | null
    agentCommercialId?: string | null
    agentCommercialAutre?: string | null
    puissanceInstallee?: string | null
    typeCompteur?: $Enums.TypeCompteur | null
    numeroCompteur?: string | null
    calibreDisjoncteur?: string | null
    puissanceSouscrite?: string | null
    productionPrevisionnelle?: string | null
    consommationAnnuelle?: string | null
    nbModules?: number | null
    puUnitairePV?: string | null
    marquePV?: string | null
    modelePV?: string | null
    nbOnduleurs?: number | null
    puUnitaireOnd?: string | null
    puOndSiAutreW?: string | null
    marqueOnd?: string | null
    modeleOnd?: string | null
    autreModeleOnd?: string | null
    equipementSurMesure?: string | null
    interventionSurMesure?: string | null
    rapportPuissance?: string | null
    dateDepotDossier?: Date | string | null
    dateApprobation?: Date | string | null
    dateInstallation?: Date | string | null
    dateDepotDemandeMES?: Date | string | null
    datePaiementPoseCompteurProsol?: Date | string | null
    dateMES?: Date | string | null
    nPolice?: string | null
    nLotDebProsol?: string | null
    saisieProsol?: string | null
    nLotDeblocageSubvention?: string | null
    deblocageProsol?: string | null
    conditionSubvention?: string | null
    saisieSubvention?: string | null
    deblocageSubvention?: string | null
    nDevis?: string | null
    dateDevis?: Date | string | null
    nFacture?: string | null
    dateFacture?: Date | string | null
    montantHT?: string | null
    tva?: string | null
    montantTTC?: string | null
    montantTTCFinal?: string | null
    montantAutofinancement?: string | null
    fraisPoseCmptProsol?: string | null
    paiement1erFactureSTEG?: string | null
    paiement2emeFactureSTEG?: string | null
    fraisAugmentationCalibre?: string | null
    fraisMutationElec?: string | null
    fraisMutationGaz?: string | null
    fraisPassageMonoTri?: string | null
    autresFrais?: string | null
    reglementClient?: string | null
    resteAPayer?: string | null
    subventionDemandee?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    echeances?: EcheanceUncheckedCreateNestedManyWithoutProjetInput
  }

  export type ProjetCreateOrConnectWithoutLogsInput = {
    where: ProjetWhereUniqueInput
    create: XOR<ProjetCreateWithoutLogsInput, ProjetUncheckedCreateWithoutLogsInput>
  }

  export type UserUpsertWithoutLogsInput = {
    update: XOR<UserUpdateWithoutLogsInput, UserUncheckedUpdateWithoutLogsInput>
    create: XOR<UserCreateWithoutLogsInput, UserUncheckedCreateWithoutLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLogsInput, UserUncheckedUpdateWithoutLogsInput>
  }

  export type UserUpdateWithoutLogsInput = {
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUpdateManyWithoutUserNestedInput
    projets?: ProjetUpdateManyWithoutAgentCommercialNestedInput
  }

  export type UserUncheckedUpdateWithoutLogsInput = {
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    projets?: ProjetUncheckedUpdateManyWithoutAgentCommercialNestedInput
  }

  export type ProjetUpsertWithoutLogsInput = {
    update: XOR<ProjetUpdateWithoutLogsInput, ProjetUncheckedUpdateWithoutLogsInput>
    create: XOR<ProjetCreateWithoutLogsInput, ProjetUncheckedCreateWithoutLogsInput>
    where?: ProjetWhereInput
  }

  export type ProjetUpdateToOneWithWhereWithoutLogsInput = {
    where?: ProjetWhereInput
    data: XOR<ProjetUpdateWithoutLogsInput, ProjetUncheckedUpdateWithoutLogsInput>
  }

  export type ProjetUpdateWithoutLogsInput = {
    codeBarres?: NullableStringFieldUpdateOperationsInput | string | null
    reference?: StringFieldUpdateOperationsInput | string
    abonnes?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    cin?: NullableStringFieldUpdateOperationsInput | string | null
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    coordonneesGps?: NullableStringFieldUpdateOperationsInput | string | null
    adresseLieuImplantation?: NullableStringFieldUpdateOperationsInput | string | null
    presenteParMF?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    gouvernorat?: NullableStringFieldUpdateOperationsInput | string | null
    delegation?: NullableStringFieldUpdateOperationsInput | string | null
    municipalite?: NullableStringFieldUpdateOperationsInput | string | null
    typeProjet?: EnumTypeProjetFieldUpdateOperationsInput | $Enums.TypeProjet
    etatDossier?: EnumEtatDossierFieldUpdateOperationsInput | $Enums.EtatDossier
    classementDossier?: EnumClassementDossierFieldUpdateOperationsInput | $Enums.ClassementDossier
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    approbationCommerciale?: EnumStatutApprobationFieldUpdateOperationsInput | $Enums.StatutApprobation
    approbationTechnique?: EnumStatutApprobationFieldUpdateOperationsInput | $Enums.StatutApprobation
    executionInstallation?: NullableStringFieldUpdateOperationsInput | string | null
    reception?: NullableStringFieldUpdateOperationsInput | string | null
    procesVerbal?: NullableStringFieldUpdateOperationsInput | string | null
    contratAchat?: NullableEnumTypeContratFieldUpdateOperationsInput | $Enums.TypeContrat | null
    montantFinancement?: NullableStringFieldUpdateOperationsInput | string | null
    tauxInteret?: NullableStringFieldUpdateOperationsInput | string | null
    banque?: NullableStringFieldUpdateOperationsInput | string | null
    agentCommercialAutre?: NullableStringFieldUpdateOperationsInput | string | null
    puissanceInstallee?: NullableStringFieldUpdateOperationsInput | string | null
    typeCompteur?: NullableEnumTypeCompteurFieldUpdateOperationsInput | $Enums.TypeCompteur | null
    numeroCompteur?: NullableStringFieldUpdateOperationsInput | string | null
    calibreDisjoncteur?: NullableStringFieldUpdateOperationsInput | string | null
    puissanceSouscrite?: NullableStringFieldUpdateOperationsInput | string | null
    productionPrevisionnelle?: NullableStringFieldUpdateOperationsInput | string | null
    consommationAnnuelle?: NullableStringFieldUpdateOperationsInput | string | null
    nbModules?: NullableIntFieldUpdateOperationsInput | number | null
    puUnitairePV?: NullableStringFieldUpdateOperationsInput | string | null
    marquePV?: NullableStringFieldUpdateOperationsInput | string | null
    modelePV?: NullableStringFieldUpdateOperationsInput | string | null
    nbOnduleurs?: NullableIntFieldUpdateOperationsInput | number | null
    puUnitaireOnd?: NullableStringFieldUpdateOperationsInput | string | null
    puOndSiAutreW?: NullableStringFieldUpdateOperationsInput | string | null
    marqueOnd?: NullableStringFieldUpdateOperationsInput | string | null
    modeleOnd?: NullableStringFieldUpdateOperationsInput | string | null
    autreModeleOnd?: NullableStringFieldUpdateOperationsInput | string | null
    equipementSurMesure?: NullableStringFieldUpdateOperationsInput | string | null
    interventionSurMesure?: NullableStringFieldUpdateOperationsInput | string | null
    rapportPuissance?: NullableStringFieldUpdateOperationsInput | string | null
    dateDepotDossier?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateApprobation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateInstallation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateDepotDemandeMES?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    datePaiementPoseCompteurProsol?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateMES?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nPolice?: NullableStringFieldUpdateOperationsInput | string | null
    nLotDebProsol?: NullableStringFieldUpdateOperationsInput | string | null
    saisieProsol?: NullableStringFieldUpdateOperationsInput | string | null
    nLotDeblocageSubvention?: NullableStringFieldUpdateOperationsInput | string | null
    deblocageProsol?: NullableStringFieldUpdateOperationsInput | string | null
    conditionSubvention?: NullableStringFieldUpdateOperationsInput | string | null
    saisieSubvention?: NullableStringFieldUpdateOperationsInput | string | null
    deblocageSubvention?: NullableStringFieldUpdateOperationsInput | string | null
    nDevis?: NullableStringFieldUpdateOperationsInput | string | null
    dateDevis?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nFacture?: NullableStringFieldUpdateOperationsInput | string | null
    dateFacture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    montantHT?: NullableStringFieldUpdateOperationsInput | string | null
    tva?: NullableStringFieldUpdateOperationsInput | string | null
    montantTTC?: NullableStringFieldUpdateOperationsInput | string | null
    montantTTCFinal?: NullableStringFieldUpdateOperationsInput | string | null
    montantAutofinancement?: NullableStringFieldUpdateOperationsInput | string | null
    fraisPoseCmptProsol?: NullableStringFieldUpdateOperationsInput | string | null
    paiement1erFactureSTEG?: NullableStringFieldUpdateOperationsInput | string | null
    paiement2emeFactureSTEG?: NullableStringFieldUpdateOperationsInput | string | null
    fraisAugmentationCalibre?: NullableStringFieldUpdateOperationsInput | string | null
    fraisMutationElec?: NullableStringFieldUpdateOperationsInput | string | null
    fraisMutationGaz?: NullableStringFieldUpdateOperationsInput | string | null
    fraisPassageMonoTri?: NullableStringFieldUpdateOperationsInput | string | null
    autresFrais?: NullableStringFieldUpdateOperationsInput | string | null
    reglementClient?: NullableStringFieldUpdateOperationsInput | string | null
    resteAPayer?: NullableStringFieldUpdateOperationsInput | string | null
    subventionDemandee?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agentCommercial?: UserUpdateOneWithoutProjetsNestedInput
    echeances?: EcheanceUpdateManyWithoutProjetNestedInput
  }

  export type ProjetUncheckedUpdateWithoutLogsInput = {
    codeBarres?: NullableStringFieldUpdateOperationsInput | string | null
    reference?: StringFieldUpdateOperationsInput | string
    abonnes?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    cin?: NullableStringFieldUpdateOperationsInput | string | null
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    coordonneesGps?: NullableStringFieldUpdateOperationsInput | string | null
    adresseLieuImplantation?: NullableStringFieldUpdateOperationsInput | string | null
    presenteParMF?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    gouvernorat?: NullableStringFieldUpdateOperationsInput | string | null
    delegation?: NullableStringFieldUpdateOperationsInput | string | null
    municipalite?: NullableStringFieldUpdateOperationsInput | string | null
    typeProjet?: EnumTypeProjetFieldUpdateOperationsInput | $Enums.TypeProjet
    etatDossier?: EnumEtatDossierFieldUpdateOperationsInput | $Enums.EtatDossier
    classementDossier?: EnumClassementDossierFieldUpdateOperationsInput | $Enums.ClassementDossier
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    approbationCommerciale?: EnumStatutApprobationFieldUpdateOperationsInput | $Enums.StatutApprobation
    approbationTechnique?: EnumStatutApprobationFieldUpdateOperationsInput | $Enums.StatutApprobation
    executionInstallation?: NullableStringFieldUpdateOperationsInput | string | null
    reception?: NullableStringFieldUpdateOperationsInput | string | null
    procesVerbal?: NullableStringFieldUpdateOperationsInput | string | null
    contratAchat?: NullableEnumTypeContratFieldUpdateOperationsInput | $Enums.TypeContrat | null
    montantFinancement?: NullableStringFieldUpdateOperationsInput | string | null
    tauxInteret?: NullableStringFieldUpdateOperationsInput | string | null
    banque?: NullableStringFieldUpdateOperationsInput | string | null
    agentCommercialId?: NullableStringFieldUpdateOperationsInput | string | null
    agentCommercialAutre?: NullableStringFieldUpdateOperationsInput | string | null
    puissanceInstallee?: NullableStringFieldUpdateOperationsInput | string | null
    typeCompteur?: NullableEnumTypeCompteurFieldUpdateOperationsInput | $Enums.TypeCompteur | null
    numeroCompteur?: NullableStringFieldUpdateOperationsInput | string | null
    calibreDisjoncteur?: NullableStringFieldUpdateOperationsInput | string | null
    puissanceSouscrite?: NullableStringFieldUpdateOperationsInput | string | null
    productionPrevisionnelle?: NullableStringFieldUpdateOperationsInput | string | null
    consommationAnnuelle?: NullableStringFieldUpdateOperationsInput | string | null
    nbModules?: NullableIntFieldUpdateOperationsInput | number | null
    puUnitairePV?: NullableStringFieldUpdateOperationsInput | string | null
    marquePV?: NullableStringFieldUpdateOperationsInput | string | null
    modelePV?: NullableStringFieldUpdateOperationsInput | string | null
    nbOnduleurs?: NullableIntFieldUpdateOperationsInput | number | null
    puUnitaireOnd?: NullableStringFieldUpdateOperationsInput | string | null
    puOndSiAutreW?: NullableStringFieldUpdateOperationsInput | string | null
    marqueOnd?: NullableStringFieldUpdateOperationsInput | string | null
    modeleOnd?: NullableStringFieldUpdateOperationsInput | string | null
    autreModeleOnd?: NullableStringFieldUpdateOperationsInput | string | null
    equipementSurMesure?: NullableStringFieldUpdateOperationsInput | string | null
    interventionSurMesure?: NullableStringFieldUpdateOperationsInput | string | null
    rapportPuissance?: NullableStringFieldUpdateOperationsInput | string | null
    dateDepotDossier?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateApprobation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateInstallation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateDepotDemandeMES?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    datePaiementPoseCompteurProsol?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateMES?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nPolice?: NullableStringFieldUpdateOperationsInput | string | null
    nLotDebProsol?: NullableStringFieldUpdateOperationsInput | string | null
    saisieProsol?: NullableStringFieldUpdateOperationsInput | string | null
    nLotDeblocageSubvention?: NullableStringFieldUpdateOperationsInput | string | null
    deblocageProsol?: NullableStringFieldUpdateOperationsInput | string | null
    conditionSubvention?: NullableStringFieldUpdateOperationsInput | string | null
    saisieSubvention?: NullableStringFieldUpdateOperationsInput | string | null
    deblocageSubvention?: NullableStringFieldUpdateOperationsInput | string | null
    nDevis?: NullableStringFieldUpdateOperationsInput | string | null
    dateDevis?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nFacture?: NullableStringFieldUpdateOperationsInput | string | null
    dateFacture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    montantHT?: NullableStringFieldUpdateOperationsInput | string | null
    tva?: NullableStringFieldUpdateOperationsInput | string | null
    montantTTC?: NullableStringFieldUpdateOperationsInput | string | null
    montantTTCFinal?: NullableStringFieldUpdateOperationsInput | string | null
    montantAutofinancement?: NullableStringFieldUpdateOperationsInput | string | null
    fraisPoseCmptProsol?: NullableStringFieldUpdateOperationsInput | string | null
    paiement1erFactureSTEG?: NullableStringFieldUpdateOperationsInput | string | null
    paiement2emeFactureSTEG?: NullableStringFieldUpdateOperationsInput | string | null
    fraisAugmentationCalibre?: NullableStringFieldUpdateOperationsInput | string | null
    fraisMutationElec?: NullableStringFieldUpdateOperationsInput | string | null
    fraisMutationGaz?: NullableStringFieldUpdateOperationsInput | string | null
    fraisPassageMonoTri?: NullableStringFieldUpdateOperationsInput | string | null
    autresFrais?: NullableStringFieldUpdateOperationsInput | string | null
    reglementClient?: NullableStringFieldUpdateOperationsInput | string | null
    resteAPayer?: NullableStringFieldUpdateOperationsInput | string | null
    subventionDemandee?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    echeances?: EcheanceUncheckedUpdateManyWithoutProjetNestedInput
  }

  export type SessionCreateManyUserInput = {
    id?: string
    refreshToken: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type ProjetCreateManyAgentCommercialInput = {
    id?: string
    codeBarres?: string | null
    reference: string
    abonnes: string
    email?: string | null
    cin?: string | null
    contact?: string | null
    coordonneesGps?: string | null
    adresseLieuImplantation?: string | null
    presenteParMF?: string | null
    district?: string | null
    gouvernorat?: string | null
    delegation?: string | null
    municipalite?: string | null
    typeProjet?: $Enums.TypeProjet
    etatDossier?: $Enums.EtatDossier
    classementDossier?: $Enums.ClassementDossier
    commentaire?: string | null
    approbationCommerciale?: $Enums.StatutApprobation
    approbationTechnique?: $Enums.StatutApprobation
    executionInstallation?: string | null
    reception?: string | null
    procesVerbal?: string | null
    contratAchat?: $Enums.TypeContrat | null
    montantFinancement?: string | null
    tauxInteret?: string | null
    banque?: string | null
    agentCommercialAutre?: string | null
    puissanceInstallee?: string | null
    typeCompteur?: $Enums.TypeCompteur | null
    numeroCompteur?: string | null
    calibreDisjoncteur?: string | null
    puissanceSouscrite?: string | null
    productionPrevisionnelle?: string | null
    consommationAnnuelle?: string | null
    nbModules?: number | null
    puUnitairePV?: string | null
    marquePV?: string | null
    modelePV?: string | null
    nbOnduleurs?: number | null
    puUnitaireOnd?: string | null
    puOndSiAutreW?: string | null
    marqueOnd?: string | null
    modeleOnd?: string | null
    autreModeleOnd?: string | null
    equipementSurMesure?: string | null
    interventionSurMesure?: string | null
    rapportPuissance?: string | null
    dateDepotDossier?: Date | string | null
    dateApprobation?: Date | string | null
    dateInstallation?: Date | string | null
    dateDepotDemandeMES?: Date | string | null
    datePaiementPoseCompteurProsol?: Date | string | null
    dateMES?: Date | string | null
    nPolice?: string | null
    nLotDebProsol?: string | null
    saisieProsol?: string | null
    nLotDeblocageSubvention?: string | null
    deblocageProsol?: string | null
    conditionSubvention?: string | null
    saisieSubvention?: string | null
    deblocageSubvention?: string | null
    nDevis?: string | null
    dateDevis?: Date | string | null
    nFacture?: string | null
    dateFacture?: Date | string | null
    montantHT?: string | null
    tva?: string | null
    montantTTC?: string | null
    montantTTCFinal?: string | null
    montantAutofinancement?: string | null
    fraisPoseCmptProsol?: string | null
    paiement1erFactureSTEG?: string | null
    paiement2emeFactureSTEG?: string | null
    fraisAugmentationCalibre?: string | null
    fraisMutationElec?: string | null
    fraisMutationGaz?: string | null
    fraisPassageMonoTri?: string | null
    autresFrais?: string | null
    reglementClient?: string | null
    resteAPayer?: string | null
    subventionDemandee?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActionLogCreateManyUserInput = {
    id?: string
    projetId?: string | null
    action: string
    details?: InputJsonValue | null
    createdAt?: Date | string
  }

  export type SessionUpdateWithoutUserInput = {
    refreshToken?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    refreshToken?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    refreshToken?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjetUpdateWithoutAgentCommercialInput = {
    codeBarres?: NullableStringFieldUpdateOperationsInput | string | null
    reference?: StringFieldUpdateOperationsInput | string
    abonnes?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    cin?: NullableStringFieldUpdateOperationsInput | string | null
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    coordonneesGps?: NullableStringFieldUpdateOperationsInput | string | null
    adresseLieuImplantation?: NullableStringFieldUpdateOperationsInput | string | null
    presenteParMF?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    gouvernorat?: NullableStringFieldUpdateOperationsInput | string | null
    delegation?: NullableStringFieldUpdateOperationsInput | string | null
    municipalite?: NullableStringFieldUpdateOperationsInput | string | null
    typeProjet?: EnumTypeProjetFieldUpdateOperationsInput | $Enums.TypeProjet
    etatDossier?: EnumEtatDossierFieldUpdateOperationsInput | $Enums.EtatDossier
    classementDossier?: EnumClassementDossierFieldUpdateOperationsInput | $Enums.ClassementDossier
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    approbationCommerciale?: EnumStatutApprobationFieldUpdateOperationsInput | $Enums.StatutApprobation
    approbationTechnique?: EnumStatutApprobationFieldUpdateOperationsInput | $Enums.StatutApprobation
    executionInstallation?: NullableStringFieldUpdateOperationsInput | string | null
    reception?: NullableStringFieldUpdateOperationsInput | string | null
    procesVerbal?: NullableStringFieldUpdateOperationsInput | string | null
    contratAchat?: NullableEnumTypeContratFieldUpdateOperationsInput | $Enums.TypeContrat | null
    montantFinancement?: NullableStringFieldUpdateOperationsInput | string | null
    tauxInteret?: NullableStringFieldUpdateOperationsInput | string | null
    banque?: NullableStringFieldUpdateOperationsInput | string | null
    agentCommercialAutre?: NullableStringFieldUpdateOperationsInput | string | null
    puissanceInstallee?: NullableStringFieldUpdateOperationsInput | string | null
    typeCompteur?: NullableEnumTypeCompteurFieldUpdateOperationsInput | $Enums.TypeCompteur | null
    numeroCompteur?: NullableStringFieldUpdateOperationsInput | string | null
    calibreDisjoncteur?: NullableStringFieldUpdateOperationsInput | string | null
    puissanceSouscrite?: NullableStringFieldUpdateOperationsInput | string | null
    productionPrevisionnelle?: NullableStringFieldUpdateOperationsInput | string | null
    consommationAnnuelle?: NullableStringFieldUpdateOperationsInput | string | null
    nbModules?: NullableIntFieldUpdateOperationsInput | number | null
    puUnitairePV?: NullableStringFieldUpdateOperationsInput | string | null
    marquePV?: NullableStringFieldUpdateOperationsInput | string | null
    modelePV?: NullableStringFieldUpdateOperationsInput | string | null
    nbOnduleurs?: NullableIntFieldUpdateOperationsInput | number | null
    puUnitaireOnd?: NullableStringFieldUpdateOperationsInput | string | null
    puOndSiAutreW?: NullableStringFieldUpdateOperationsInput | string | null
    marqueOnd?: NullableStringFieldUpdateOperationsInput | string | null
    modeleOnd?: NullableStringFieldUpdateOperationsInput | string | null
    autreModeleOnd?: NullableStringFieldUpdateOperationsInput | string | null
    equipementSurMesure?: NullableStringFieldUpdateOperationsInput | string | null
    interventionSurMesure?: NullableStringFieldUpdateOperationsInput | string | null
    rapportPuissance?: NullableStringFieldUpdateOperationsInput | string | null
    dateDepotDossier?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateApprobation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateInstallation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateDepotDemandeMES?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    datePaiementPoseCompteurProsol?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateMES?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nPolice?: NullableStringFieldUpdateOperationsInput | string | null
    nLotDebProsol?: NullableStringFieldUpdateOperationsInput | string | null
    saisieProsol?: NullableStringFieldUpdateOperationsInput | string | null
    nLotDeblocageSubvention?: NullableStringFieldUpdateOperationsInput | string | null
    deblocageProsol?: NullableStringFieldUpdateOperationsInput | string | null
    conditionSubvention?: NullableStringFieldUpdateOperationsInput | string | null
    saisieSubvention?: NullableStringFieldUpdateOperationsInput | string | null
    deblocageSubvention?: NullableStringFieldUpdateOperationsInput | string | null
    nDevis?: NullableStringFieldUpdateOperationsInput | string | null
    dateDevis?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nFacture?: NullableStringFieldUpdateOperationsInput | string | null
    dateFacture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    montantHT?: NullableStringFieldUpdateOperationsInput | string | null
    tva?: NullableStringFieldUpdateOperationsInput | string | null
    montantTTC?: NullableStringFieldUpdateOperationsInput | string | null
    montantTTCFinal?: NullableStringFieldUpdateOperationsInput | string | null
    montantAutofinancement?: NullableStringFieldUpdateOperationsInput | string | null
    fraisPoseCmptProsol?: NullableStringFieldUpdateOperationsInput | string | null
    paiement1erFactureSTEG?: NullableStringFieldUpdateOperationsInput | string | null
    paiement2emeFactureSTEG?: NullableStringFieldUpdateOperationsInput | string | null
    fraisAugmentationCalibre?: NullableStringFieldUpdateOperationsInput | string | null
    fraisMutationElec?: NullableStringFieldUpdateOperationsInput | string | null
    fraisMutationGaz?: NullableStringFieldUpdateOperationsInput | string | null
    fraisPassageMonoTri?: NullableStringFieldUpdateOperationsInput | string | null
    autresFrais?: NullableStringFieldUpdateOperationsInput | string | null
    reglementClient?: NullableStringFieldUpdateOperationsInput | string | null
    resteAPayer?: NullableStringFieldUpdateOperationsInput | string | null
    subventionDemandee?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    echeances?: EcheanceUpdateManyWithoutProjetNestedInput
    logs?: ActionLogUpdateManyWithoutProjetNestedInput
  }

  export type ProjetUncheckedUpdateWithoutAgentCommercialInput = {
    codeBarres?: NullableStringFieldUpdateOperationsInput | string | null
    reference?: StringFieldUpdateOperationsInput | string
    abonnes?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    cin?: NullableStringFieldUpdateOperationsInput | string | null
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    coordonneesGps?: NullableStringFieldUpdateOperationsInput | string | null
    adresseLieuImplantation?: NullableStringFieldUpdateOperationsInput | string | null
    presenteParMF?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    gouvernorat?: NullableStringFieldUpdateOperationsInput | string | null
    delegation?: NullableStringFieldUpdateOperationsInput | string | null
    municipalite?: NullableStringFieldUpdateOperationsInput | string | null
    typeProjet?: EnumTypeProjetFieldUpdateOperationsInput | $Enums.TypeProjet
    etatDossier?: EnumEtatDossierFieldUpdateOperationsInput | $Enums.EtatDossier
    classementDossier?: EnumClassementDossierFieldUpdateOperationsInput | $Enums.ClassementDossier
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    approbationCommerciale?: EnumStatutApprobationFieldUpdateOperationsInput | $Enums.StatutApprobation
    approbationTechnique?: EnumStatutApprobationFieldUpdateOperationsInput | $Enums.StatutApprobation
    executionInstallation?: NullableStringFieldUpdateOperationsInput | string | null
    reception?: NullableStringFieldUpdateOperationsInput | string | null
    procesVerbal?: NullableStringFieldUpdateOperationsInput | string | null
    contratAchat?: NullableEnumTypeContratFieldUpdateOperationsInput | $Enums.TypeContrat | null
    montantFinancement?: NullableStringFieldUpdateOperationsInput | string | null
    tauxInteret?: NullableStringFieldUpdateOperationsInput | string | null
    banque?: NullableStringFieldUpdateOperationsInput | string | null
    agentCommercialAutre?: NullableStringFieldUpdateOperationsInput | string | null
    puissanceInstallee?: NullableStringFieldUpdateOperationsInput | string | null
    typeCompteur?: NullableEnumTypeCompteurFieldUpdateOperationsInput | $Enums.TypeCompteur | null
    numeroCompteur?: NullableStringFieldUpdateOperationsInput | string | null
    calibreDisjoncteur?: NullableStringFieldUpdateOperationsInput | string | null
    puissanceSouscrite?: NullableStringFieldUpdateOperationsInput | string | null
    productionPrevisionnelle?: NullableStringFieldUpdateOperationsInput | string | null
    consommationAnnuelle?: NullableStringFieldUpdateOperationsInput | string | null
    nbModules?: NullableIntFieldUpdateOperationsInput | number | null
    puUnitairePV?: NullableStringFieldUpdateOperationsInput | string | null
    marquePV?: NullableStringFieldUpdateOperationsInput | string | null
    modelePV?: NullableStringFieldUpdateOperationsInput | string | null
    nbOnduleurs?: NullableIntFieldUpdateOperationsInput | number | null
    puUnitaireOnd?: NullableStringFieldUpdateOperationsInput | string | null
    puOndSiAutreW?: NullableStringFieldUpdateOperationsInput | string | null
    marqueOnd?: NullableStringFieldUpdateOperationsInput | string | null
    modeleOnd?: NullableStringFieldUpdateOperationsInput | string | null
    autreModeleOnd?: NullableStringFieldUpdateOperationsInput | string | null
    equipementSurMesure?: NullableStringFieldUpdateOperationsInput | string | null
    interventionSurMesure?: NullableStringFieldUpdateOperationsInput | string | null
    rapportPuissance?: NullableStringFieldUpdateOperationsInput | string | null
    dateDepotDossier?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateApprobation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateInstallation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateDepotDemandeMES?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    datePaiementPoseCompteurProsol?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateMES?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nPolice?: NullableStringFieldUpdateOperationsInput | string | null
    nLotDebProsol?: NullableStringFieldUpdateOperationsInput | string | null
    saisieProsol?: NullableStringFieldUpdateOperationsInput | string | null
    nLotDeblocageSubvention?: NullableStringFieldUpdateOperationsInput | string | null
    deblocageProsol?: NullableStringFieldUpdateOperationsInput | string | null
    conditionSubvention?: NullableStringFieldUpdateOperationsInput | string | null
    saisieSubvention?: NullableStringFieldUpdateOperationsInput | string | null
    deblocageSubvention?: NullableStringFieldUpdateOperationsInput | string | null
    nDevis?: NullableStringFieldUpdateOperationsInput | string | null
    dateDevis?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nFacture?: NullableStringFieldUpdateOperationsInput | string | null
    dateFacture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    montantHT?: NullableStringFieldUpdateOperationsInput | string | null
    tva?: NullableStringFieldUpdateOperationsInput | string | null
    montantTTC?: NullableStringFieldUpdateOperationsInput | string | null
    montantTTCFinal?: NullableStringFieldUpdateOperationsInput | string | null
    montantAutofinancement?: NullableStringFieldUpdateOperationsInput | string | null
    fraisPoseCmptProsol?: NullableStringFieldUpdateOperationsInput | string | null
    paiement1erFactureSTEG?: NullableStringFieldUpdateOperationsInput | string | null
    paiement2emeFactureSTEG?: NullableStringFieldUpdateOperationsInput | string | null
    fraisAugmentationCalibre?: NullableStringFieldUpdateOperationsInput | string | null
    fraisMutationElec?: NullableStringFieldUpdateOperationsInput | string | null
    fraisMutationGaz?: NullableStringFieldUpdateOperationsInput | string | null
    fraisPassageMonoTri?: NullableStringFieldUpdateOperationsInput | string | null
    autresFrais?: NullableStringFieldUpdateOperationsInput | string | null
    reglementClient?: NullableStringFieldUpdateOperationsInput | string | null
    resteAPayer?: NullableStringFieldUpdateOperationsInput | string | null
    subventionDemandee?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    echeances?: EcheanceUncheckedUpdateManyWithoutProjetNestedInput
    logs?: ActionLogUncheckedUpdateManyWithoutProjetNestedInput
  }

  export type ProjetUncheckedUpdateManyWithoutAgentCommercialInput = {
    codeBarres?: NullableStringFieldUpdateOperationsInput | string | null
    reference?: StringFieldUpdateOperationsInput | string
    abonnes?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    cin?: NullableStringFieldUpdateOperationsInput | string | null
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    coordonneesGps?: NullableStringFieldUpdateOperationsInput | string | null
    adresseLieuImplantation?: NullableStringFieldUpdateOperationsInput | string | null
    presenteParMF?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    gouvernorat?: NullableStringFieldUpdateOperationsInput | string | null
    delegation?: NullableStringFieldUpdateOperationsInput | string | null
    municipalite?: NullableStringFieldUpdateOperationsInput | string | null
    typeProjet?: EnumTypeProjetFieldUpdateOperationsInput | $Enums.TypeProjet
    etatDossier?: EnumEtatDossierFieldUpdateOperationsInput | $Enums.EtatDossier
    classementDossier?: EnumClassementDossierFieldUpdateOperationsInput | $Enums.ClassementDossier
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    approbationCommerciale?: EnumStatutApprobationFieldUpdateOperationsInput | $Enums.StatutApprobation
    approbationTechnique?: EnumStatutApprobationFieldUpdateOperationsInput | $Enums.StatutApprobation
    executionInstallation?: NullableStringFieldUpdateOperationsInput | string | null
    reception?: NullableStringFieldUpdateOperationsInput | string | null
    procesVerbal?: NullableStringFieldUpdateOperationsInput | string | null
    contratAchat?: NullableEnumTypeContratFieldUpdateOperationsInput | $Enums.TypeContrat | null
    montantFinancement?: NullableStringFieldUpdateOperationsInput | string | null
    tauxInteret?: NullableStringFieldUpdateOperationsInput | string | null
    banque?: NullableStringFieldUpdateOperationsInput | string | null
    agentCommercialAutre?: NullableStringFieldUpdateOperationsInput | string | null
    puissanceInstallee?: NullableStringFieldUpdateOperationsInput | string | null
    typeCompteur?: NullableEnumTypeCompteurFieldUpdateOperationsInput | $Enums.TypeCompteur | null
    numeroCompteur?: NullableStringFieldUpdateOperationsInput | string | null
    calibreDisjoncteur?: NullableStringFieldUpdateOperationsInput | string | null
    puissanceSouscrite?: NullableStringFieldUpdateOperationsInput | string | null
    productionPrevisionnelle?: NullableStringFieldUpdateOperationsInput | string | null
    consommationAnnuelle?: NullableStringFieldUpdateOperationsInput | string | null
    nbModules?: NullableIntFieldUpdateOperationsInput | number | null
    puUnitairePV?: NullableStringFieldUpdateOperationsInput | string | null
    marquePV?: NullableStringFieldUpdateOperationsInput | string | null
    modelePV?: NullableStringFieldUpdateOperationsInput | string | null
    nbOnduleurs?: NullableIntFieldUpdateOperationsInput | number | null
    puUnitaireOnd?: NullableStringFieldUpdateOperationsInput | string | null
    puOndSiAutreW?: NullableStringFieldUpdateOperationsInput | string | null
    marqueOnd?: NullableStringFieldUpdateOperationsInput | string | null
    modeleOnd?: NullableStringFieldUpdateOperationsInput | string | null
    autreModeleOnd?: NullableStringFieldUpdateOperationsInput | string | null
    equipementSurMesure?: NullableStringFieldUpdateOperationsInput | string | null
    interventionSurMesure?: NullableStringFieldUpdateOperationsInput | string | null
    rapportPuissance?: NullableStringFieldUpdateOperationsInput | string | null
    dateDepotDossier?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateApprobation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateInstallation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateDepotDemandeMES?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    datePaiementPoseCompteurProsol?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateMES?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nPolice?: NullableStringFieldUpdateOperationsInput | string | null
    nLotDebProsol?: NullableStringFieldUpdateOperationsInput | string | null
    saisieProsol?: NullableStringFieldUpdateOperationsInput | string | null
    nLotDeblocageSubvention?: NullableStringFieldUpdateOperationsInput | string | null
    deblocageProsol?: NullableStringFieldUpdateOperationsInput | string | null
    conditionSubvention?: NullableStringFieldUpdateOperationsInput | string | null
    saisieSubvention?: NullableStringFieldUpdateOperationsInput | string | null
    deblocageSubvention?: NullableStringFieldUpdateOperationsInput | string | null
    nDevis?: NullableStringFieldUpdateOperationsInput | string | null
    dateDevis?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nFacture?: NullableStringFieldUpdateOperationsInput | string | null
    dateFacture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    montantHT?: NullableStringFieldUpdateOperationsInput | string | null
    tva?: NullableStringFieldUpdateOperationsInput | string | null
    montantTTC?: NullableStringFieldUpdateOperationsInput | string | null
    montantTTCFinal?: NullableStringFieldUpdateOperationsInput | string | null
    montantAutofinancement?: NullableStringFieldUpdateOperationsInput | string | null
    fraisPoseCmptProsol?: NullableStringFieldUpdateOperationsInput | string | null
    paiement1erFactureSTEG?: NullableStringFieldUpdateOperationsInput | string | null
    paiement2emeFactureSTEG?: NullableStringFieldUpdateOperationsInput | string | null
    fraisAugmentationCalibre?: NullableStringFieldUpdateOperationsInput | string | null
    fraisMutationElec?: NullableStringFieldUpdateOperationsInput | string | null
    fraisMutationGaz?: NullableStringFieldUpdateOperationsInput | string | null
    fraisPassageMonoTri?: NullableStringFieldUpdateOperationsInput | string | null
    autresFrais?: NullableStringFieldUpdateOperationsInput | string | null
    reglementClient?: NullableStringFieldUpdateOperationsInput | string | null
    resteAPayer?: NullableStringFieldUpdateOperationsInput | string | null
    subventionDemandee?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActionLogUpdateWithoutUserInput = {
    action?: StringFieldUpdateOperationsInput | string
    details?: InputJsonValue | InputJsonValue | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projet?: ProjetUpdateOneWithoutLogsNestedInput
  }

  export type ActionLogUncheckedUpdateWithoutUserInput = {
    projetId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    details?: InputJsonValue | InputJsonValue | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActionLogUncheckedUpdateManyWithoutUserInput = {
    projetId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    details?: InputJsonValue | InputJsonValue | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EcheanceCreateManyProjetInput = {
    id?: string
    numero: number
    montant?: string | null
    date?: Date | string | null
    modePaiement?: string | null
    description?: string | null
  }

  export type ActionLogCreateManyProjetInput = {
    id?: string
    userId: string
    action: string
    details?: InputJsonValue | null
    createdAt?: Date | string
  }

  export type EcheanceUpdateWithoutProjetInput = {
    numero?: IntFieldUpdateOperationsInput | number
    montant?: NullableStringFieldUpdateOperationsInput | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    modePaiement?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EcheanceUncheckedUpdateWithoutProjetInput = {
    numero?: IntFieldUpdateOperationsInput | number
    montant?: NullableStringFieldUpdateOperationsInput | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    modePaiement?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EcheanceUncheckedUpdateManyWithoutProjetInput = {
    numero?: IntFieldUpdateOperationsInput | number
    montant?: NullableStringFieldUpdateOperationsInput | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    modePaiement?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ActionLogUpdateWithoutProjetInput = {
    action?: StringFieldUpdateOperationsInput | string
    details?: InputJsonValue | InputJsonValue | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutLogsNestedInput
  }

  export type ActionLogUncheckedUpdateWithoutProjetInput = {
    userId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: InputJsonValue | InputJsonValue | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActionLogUncheckedUpdateManyWithoutProjetInput = {
    userId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: InputJsonValue | InputJsonValue | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}