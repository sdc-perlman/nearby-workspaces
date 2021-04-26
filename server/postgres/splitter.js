const splitter = require('pg_dump-split');

(async () => {
  await splitter.split('/Volumes/CodePort/HackReactor/sdc/docker_postgres_init.sql');
})();
