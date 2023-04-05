const db = require("./db");
const config = require("../config");

const getMultiple = async (page = 1) => {
  const rows = await db.query(`SELECT * FROM base_equips`);

  const data = rows || [];
  const meta = { page };
  return {
    data,
    meta,
  };
};

const create = async (equipment) => {
  const result = await db.query(
    `INSERT INTO base_equips
        (equip_name, equip_type, require_level, durability, max_sockets)
        VALUES(${equipment.name},
             ${equipment.type},
              ${equipment.require_level},
               ${equipment.durability},
             ${equipment.max_sockets})`
  );
  let message = "Error in creating equipment";

  if (result.affectedRows) {
    message = "Equipment created successfully";
  }

  return { message };
};

const update = async (id, equipment) => {
  const result = await db.query(
    `UPDATE base_equips
        SET equip_name="${equipment.name}", 
        equip_type="${equipment.type}", 
        require_level=${equipment.require_level}, 
        durability=${equipment.durability},
        max_sockets=${equipment.max_sockets}
        WHERE id=${id}`
  );
  let message = "Error in updating equipment";

  if (result.affectedRows) {
    message = "Equipment updated successfully";
  }

  return { message };
};

const remove = async (id) => {
  const result = await db.query(`DELETE FROM base_equips WHERE id=${id}`);
  let message = "Error in deleting equipment";

  if (result.affectedRows) {
    message = "Equipment deleted successfully";
  }

  return { message };
};

module.exports = {
  getMultiple,
  create,
  update,
  remove,
};
