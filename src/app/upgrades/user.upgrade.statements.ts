export class UserUpgradeStatements {
  userUpgrades = [
    {
      toVersion: 1,
      statements: [
        `CREATE TABLE IF NOT EXISTS exercises(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          additional_info TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS muscles(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL
        );
        `
      ]
    },
    /*
        CREATE TABLE IF NOT EXISTS muscles(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS muscle_emphasis(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          exercise_id INTEGER,
          FOREIGN KEY (exercise_id) REFERENCES exercises(id),
          emphasis REAL,
          muscle_id INTEGER,
          FOREIGN KEY (muscle_id) REFERENCES muscles(id),
        );
    */



    /* add new statements below for next database version when required*/
    /*
    {
      toVersion: 2,
      statements: [
        `ALTER TABLE users ADD COLUMN email TEXT;`,
      ]
    }
    */
  ]
}
