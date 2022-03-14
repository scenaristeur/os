
//https://nodejs.org/api/module.html#module_module_createrequire_filename

```
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

var level      = require('level'),
yourDB     = level('./yourdb'),
levelgraph = require('levelgraph'),
jsonld     = require('levelgraph-jsonld'),
db         = jsonld(levelgraph(yourDB));
```
