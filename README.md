# firestore-document-type-patterns

This Package Basically Published By Github Packages

> firestore-document-type-patterns give you type test patterns.
> Then you might be able to check value types for security rule test easily.

## Installation

from v2.0.0
**Please set the 'type' field in your package.json to 'module' since this package supports Pure ESM.**

```json
{
  "type": "module"
}
```

Github Packages

```bash
$ echo "@cilly-yllic:registry=https://npm.pkg.github.com" >> .npmrc
$ npm i @cilly-yllic/firestore-document-type-partterns
```

NPM Packages

```bash
$ npm i firestore-document-type-partterns
```

## How To Use

**If you install from NPM rename `@cilly-yllic/firestore-document-type-partterns` to `firestore-document-type-partterns`**

```ts
import { assertSucceeds, assertFails } from '@firebase/rules-unit-testing'
import { doc, setDoc } from 'firebase/firestore'
import { v4 as randomStr } from 'uuid'
import {
  getKeyTypePatterns,
  convertTypeToValue,
  getRecursiveWrongTypes,
} from '@cilly-yllic/firestore-document-type-partterns/security-rule'
import { DocumentType, TypePattern, ALL_FIELD_TYPES } from '@cilly-yllic/firestore-document-type-partterns/types/firestore-field-types'

const documentTypes: DocumentType = {
  uid: ALL_FIELD_TYPES.string,
  'tags[]': ALL_FIELD_TYPES.string,
  createdAt: ALL_FIELD_TYPES.timestamp,
}

const wrongTypes = getRecursiveWrongTypes(documentTypes)
const rightTypes = getKeyTypePatterns(documentTypes)
const path = 'users'
const uid = randomStr()
const pathSegments = [uid]

describe('', () => {
  rightTypes.forEach(data => {
    test(`${JSON.stringify(data, null, 2)}`, async () => {
      await assertSucceeds(setDoc(doc(db, path, ...pathSegments), convertTypeToValue(data, db)))
    })
  })

  wrongTypes.forEach(data => {
    test(`${JSON.stringify(data, null, 2)}`, async () => {
      await assertFails(setDoc(doc(db, path, ...pathSegments), convertTypeToValue(data, db)))
    })
  })
})
```

## Type Variables

| Field type | rule         | name                      |
| ---------- | ------------ | ------------------------- |
| string     | is string    | ALL_FIELD_TYPES.string    |
| number     | is number    | ALL_FIELD_TYPES.number    |
| int        | is int       | ALL_FIELD_TYPES.int       |
| float      | is float     | ALL_FIELD_TYPES.float     |
| bool       | is bool      | ALL_FIELD_TYPES.bool      |
| map        | is map       | ALL_FIELD_TYPES.map       |
| list       | is list      | ALL_FIELD_TYPES.list      |
| null       | == null      | ALL_FIELD_TYPES.null      |
| timestamp  | is timestamp | ALL_FIELD_TYPES.timestamp |
| latlng     | is latlng    | ALL_FIELD_TYPES.latlng    |
| path       | is path      | ALL_FIELD_TYPES.path      |

## DocumentType Rule

### Ex1: Simple

```firebase_rules
function isStr(data) {
    return data is string;
}
```

```ts
const documentTypes: DocumentType = {
  uid: ALL_FIELD_TYPES.string,
}
```

`getKeyTypePatterns`

```text
[
  { uid: 'hoge' }
]
```

`getRecursiveWrongTypes`

```text
[
  { uid: -1 },
  { uid: 1 },
  { uid: 1.1 },
  { uid: true },
  { uid: {} },
  { uid: [] },
  { uid: null },
  { uid: FieldValue },
  { uid: GeoPoint },
  { uid: DocumentReference<DocumentData> },

]
```

### Ex2: Multiple types of One Field

```firebase_rules
function(data) {
    return data.uid is string
        && (data.createdAt is timestamp || data.createdAt == null);
}
```

```ts
const documentTypes: DocumentType = {
  uid: ALL_FIELD_TYPES.string,
  createdAt: [ALL_FIELD_TYPES.timestamp, ALL_FIELD_TYPES.string.null],
}
```

`getKeyTypePatterns`

```text
[
  {
    uid: 'hoge',
    createdAt: FieldValue,
  },
  {
    uid: 'hoge',
    createdAt: null,
  }
]
```

`getRecursiveWrongTypes`

```text
[

  { uid: 1, createdAt: FieldValue },
  { uid: 1, createdAt: null },

  { uid: -1, createdAt: FieldValue },
  { uid: -1, createdAt: null },

  { uid: 1.1, createdAt: FieldValue },
  { uid: 1.1, createdAt: null },

  { uid: true, createdAt: FieldValue },
  { uid: true, createdAt: null },

  { uid: {}, createdAt: FieldValue },
  { uid: {}, createdAt: null },

  { uid: [], createdAt: FieldValue },
  { uid: [], createdAt: null },

  { uid: null, createdAt: FieldValue },
  { uid: null, createdAt: null },

  { uid: FieldValue, createdAt: FieldValue },
  { uid: FieldValue, createdAt: null },

  { uid: GeoPoint, createdAt: FieldValue },
  { uid: GeoPoint, createdAt: null },

  { uid: DocumentReference<DocumentData>, createdAt: FieldValue },
  { uid: DocumentReference<DocumentData>, createdAt: null },

  { uid: 'hoge', createdAt: 'hoge' },
  { uid: 'hoge', createdAt: -1 },
  { uid: 'hoge', createdAt: 1 },
  { uid: 'hoge', createdAt: 1.1 },
  { uid: 'hoge', createdAt: true },
  { uid: 'hoge', createdAt: {} },
  { uid: 'hoge', createdAt: [] },
  { uid: 'hoge', createdAt: GeoPoint },
  { uid: 'hoge', createdAt: DocumentReference<DocumentData> },
]
```

### Ex3: Array Field

```firebase_rules
function isStrings(strings) {
    return strings.size() == 0 || ( strings.size() >= 1 && strings[strings.size() - 1] is string )
}
```

```ts
const documentTypes: DocumentType = {
  'tags[]': ALL_FIELD_TYPES.string,
}
```

`getKeyTypePatterns`

```text
[
  {
    tags: ['hoge'],
  }
]
```

`getRecursiveWrongTypes`

```text
[
  { tags: [-1] },
  { tags: [1] },
  { tags: [1.1] },
  { tags: [true] },
  { tags: [{}] },
  { tags: [null] },
  { tags: [FieldValue] },
  { tags: [GeoPoint] },
  { tags: [DocumentReference<DocumentData>] },

]
```

### Ex4: Map Field

```firebase_rules
function(data) {
    return data.map.size() == 1
        && data.map.uid is string
}
```

```ts
const documentTypes: DocumentType = {
  map: {
    uid: ALL_FIELD_TYPES.string,
  },
}
```

`getKeyTypePatterns`

```text
[
  {
    map: {
      uid: 'hoge',
    }
  }
]
```

`getRecursiveWrongTypes`

```text
[
  { map: { uid: 'hoge' } },
  { map: { uid: -1 } },
  { map: { uid: 1 } },
  { map: { uid: 1.1 } },
  { map: { uid: true } },
  { map: { uid: {} },
  { map: { uid: [] } },
  { map: { uid: null } },
  { map: { uid: FieldValue } },
  { map: { uid: GeoPoint } },
  { map: { uid: DocumentReference<DocumentData> } }
]
```

### Ex5: Specific Value

```firebase_rules
function isStatus(status) {
    return status == 'success' || status == 'error';
}
function hasStatusKey(data) {
  return 'status' in data && isStatus(data.status);
}
```

```ts
const documentTypes: DocumentType = {
  status: ['success', 'error'],
}
```

`getKeyTypePatterns`

```text
[
  { status: 'success' },
  { status: 'error' },
]
```

`getRecursiveWrongTypes`

```text
[
  { status: 'hoge' },
  { status: -1 },
  { status: 1 },
  { status: 1.1 },
  { status: true },
  { status: {} },
  { status: [] },
  { status: null },
  { status: FieldValue },
  { status: GeoPoint },
  { status: DocumentReference<DocumentData> },

]
```

## Tips

Might be work

```ts
const documentTypes: DocumentType = {
  uid: ALL_FIELD_TYPES.string,
  'list[]': [
    ALL_FIELD_TYPES.number,
    {
      uid: ALL_FIELD_TYPES.string,
      'list[]': ALL_FIELD_TYPES.bool,
    },
  ],
  map: {
    'list[]': [ALL_FIELD_TYPES.bool, ALL_FIELD_TYPES.number],
    nestedMap: [
      ALL_FIELD_TYPES.null,
      {
        hoge: ALL_FIELD_TYPES.string,
      },
    ],
  },
}
```

### Timestamp for In Array

> usually use serverTimestamp(), but use new Date() in Array
> because FieldValue.serverTimestamp() is not currently supported inside array.

### number, int, float

```txt
number's concept include int and float
```

ex:

```txt
int: allow 1 and -1, reject 1.1 and -1.1
float: allow 1.1 and -1.1, reject 1 and -1
number: allow all these above (1, -1, 1.1, and -1.1)
```

```txt
then, wrong type of number not contain int or float neither.
and also wrong type of (int / float) not contain number.
```
