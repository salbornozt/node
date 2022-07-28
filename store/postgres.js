const { Pool, Client } = require('pg')
const pgp = require('pg-promise')
const error = require('../network/errors')

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PSS,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false
  }
})

client.connect(function (err) {
  if (err) {
    console.error(err);
    throw error('Internal Server Error', 500);
  }
  console.log("Connected!");
});


function list() {
  var data = "usuario.cod_usuario, email, contrasena, nom_usuario, apellido_usuario, tipo_usuario, documento, celular"
  var table = "usuario"
  return new Promise((resolve, reject) => {
    client.query(`select ${data} from auth inner join usuario on auth.cod_usuario = usuario.cod_usuario`, [], (err, res) => {
      if (err) {
        console.error(err);
        reject(err);

      }
      resolve(res.rows);
    })
  })
}

function getEmpleados() {
  var data = "usuario.cod_usuario, email, contrasena, nom_usuario, apellido_usuario, tipo_usuario, documento, celular"
  var table = "usuario"
  return new Promise((resolve, reject) => {
    client.query(`select ${data} from auth inner join usuario on auth.cod_usuario = usuario.cod_usuario WHERE usuario.tipo_usuario=0`, [], (err, res) => {
      if (err) {
        console.error(err);
        reject(err);

      }
      resolve(res.rows);
    })
  })
}


function getEmpleadoById(id) {
  var data = "usuario.cod_usuario, email, contrasena, nom_usuario, apellido_usuario, tipo_usuario, documento, celular"
  var table = "usuario"
  return new Promise((resolve, reject) => {
    client.query(`select ${data} from auth inner join usuario on auth.cod_usuario = usuario.cod_usuario WHERE usuario.cod_usuario=$1`, [id], (err, res) => {
      if (err) {
        console.error(err);
        reject(err);

      }
      resolve(res.rows[0]);
    })
  })
}



function get(id) {
  var data = "usuario.cod_usuario, email, contrasena, nom_usuario, apellido_usuario, tipo_usuario, documento, celular"
  return new Promise((resolve, reject) => {
    client.query(`select ${data} from auth inner join usuario on auth.cod_usuario = usuario.cod_usuario WHERE usuario.cod_usuario = $1`, [id], (err, res) => {
      if (err) {
        console.error(err);
        reject(err);

      }

      resolve(res.rows[0]);
    })
  });
}

function getUserByEmail(email) {

  var data = "usuario.cod_usuario, email, contrasena, nom_usuario, apellido_usuario, tipo_usuario, documento, celular"
  return new Promise((resolve, reject) => {
    client.query(`select ${data} from auth inner join usuario on auth.cod_usuario = usuario.cod_usuario WHERE email = $1`, [email], (err, res) => {
      if (err) {
        console.error(err);
        reject(err);

      }
      console.log("sucees");

      console.log(res.rows[0]);
      resolve(res.rows[0]);
    })



  })

}

function insertUser(data) {

  return new Promise((resolve, reject) => {
    let query = `insert into usuario(nom_usuario,tipo_usuario,apellido_usuario,documento) values ($1,$2,$3,$4) RETURNING cod_usuario`
    client.query(query, [data.name, data.user_type, data.lastname, data.document], (err, res) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      console.log("user inserted");
      console.log(res.rows[0]);
      resolve(res.rows[0]);
    })

  });
}



function updateUser(data) {
  //console.log(data)
  console.log("Entro al postgres")
  return new Promise((resolve, reject) => {
    
    let query = `UPDATE usuario SET nom_usuario = $1, apellido_usuario=$2, celular=$3 WHERE cod_usuario =$4`
  
    client.query(query, [data.nom_usuario,data.apellido_usuario,data.celular,data.cod_usuario], (err, res) => {
      if (err) {
        console.log('error aqui' + err.message);
        console.error(err);
        reject(err);
      }
      console.log("user updated" + res.rows);
      resolve(res.rows);
    })

  });
}

function insertAuth(data) {
  return new Promise((resolve, reject) => {
    let query = `insert into auth(cod_usuario,email,contrasena) values ($1,$2,$3) `
    client.query(query, [data.user_id, data.email, data.password], (err, res) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      console.log("auth inserted");
      resolve(res.rows[0]);
    })

  });
}


/***
 * CLIENTES
 */


function listClients() {
  var data = "*"
  var table = "cliente"
  return new Promise((resolve, reject) => {
    client.query(`select ${data} from ${table}`, (err, res) => {
      if (err) {
        console.error(err);
        reject(err);

      }
      console.log('cliets fetched');

      resolve(res.rows);
    })
  })
}

function getClient(id) {
  var data = "*"
  var table = "cliente"
  return new Promise((resolve, reject) => {
    client.query(`select ${data} from ${table} where cod_cliente = $1`, [id], (err, res) => {
      if (err) {
        console.error(err);
        reject(err);

      }
      resolve(res.rows[0]);
    })
  })
}

function getClientByDocument(cedula) {
  var data = "*"
  var table = "cliente"
  return new Promise((resolve, reject) => {
    client.query(`select ${data} from ${table} where cedula = $1`, [cedula], (err, res) => {
      if (err) {
        console.error(err);
        reject(err);

      }
      resolve(res.rows[0]);
    })
  })
}

function getClientEmails(id) {
  var data = "*"
  var table = "email_cliente"
  return new Promise((resolve, reject) => {
    client.query(`select ${data} from ${table} where cod_cliente = $1`, [id], (err, res) => {
      if (err) {
        console.error(err);
        reject(err);

      }
      resolve(res.rows);
    })
  })

}

function getClientPhones(id) {
  var data = "*"
  var table = "celular_cliente"
  return new Promise((resolve, reject) => {
    client.query(`select ${data} from ${table} where cod_cliente = $1`, [id], (err, res) => {
      if (err) {
        console.error(err);
        reject(err);

      }
      resolve(res.rows);
    })
  })

}


function insertClient(data) {

  return new Promise((resolve, reject) => {
    let query = `insert into cliente(nom_cliente,ocupacion,ciudad,cedula,direccion,cod_naturaleza,cod_tipo_cliente,sexo,birth_date,company) values ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING cod_cliente`
    client.query(query, [data.nom_cliente, data.ocupacion, data.ciudad, data.cedula, data.direccion, data.cod_naturaleza, data.cod_tipo_cliente, data.sexo, data.birth_date, data.company], (err, res) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      console.log("client inserted");
      console.log(res.rows[0]);
      resolve(res.rows[0]);
    })

  });
}

function updateClient(id,data) {

  return new Promise((resolve, reject) => {
    let query = `update cliente set nom_cliente=$1, ocupacion=$2, ciudad=$3, cedula=$4, direccion=$5, cod_naturaleza=$6, cod_tipo_cliente=$7, sexo=$8, company=$9, birth_date=$10,  apellido_cliente=$11 where cod_cliente = $12`
    client.query(query, [data.nom_cliente, data.ocupacion, data.ciudad, data.cedula, data.direccion, data.cod_naturaleza, data.cod_tipo_cliente, data.sexo, data.company, data.birth_date, data.apellido_cliente, id], (err, res) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      console.log("client updated");
      console.log(res);
      resolve(res);
    })

  });
}
function insertClientToGetId() {

  let name = "Nuevo Cliente";
  return new Promise((resolve, reject) => {
    let query = `insert into cliente(nom_cliente) values ($1) RETURNING cod_cliente`
    client.query(query, [name], (err, res) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      console.log("client inserted");
      res.rows[0].nom_cliente = name
      console.log(res.rows[0]);

      resolve(res.rows[0]);
    })

  });
}

function insertEmpleadoById() {

  let name = "Nuevo Empleado";
  return new Promise((resolve, reject) => {
    let query = `insert into usuario(nom_usuario,tipo_usuario) values ($1,0) RETURNING cod_usuario`
    client.query(query, [name], (err, res) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      console.log("empleado inserted");  
      res.rows[0].nom_usuario = name
      resolve(res.rows[0]);
    })

  });
}

function removeUser(id) {

  
  return new Promise((resolve, reject) => {
    let query = `delete from auth where cod_usuario = $1`
    client.query(query, [id], (err, res) => {
      let respuesta = {
        isDeleted : true
      }
      if (err) {
        console.error(err);
        reject(err);
      }
      console.log(id)
      console.log("client removed");
      

      resolve(respuesta);
    })

  });
}


function removeClient(id) {

  
  return new Promise((resolve, reject) => {
    let query = `delete from cliente where cod_cliente = $1`
    client.query(query, [id], (err, res) => {
      let respuesta = {
        isDeleted : true
      }
      if (err) {
        console.error(err);
        reject(err);
      }
      console.log("client removed");
      

      resolve(respuesta);
    })

  });
}


function insertEmails(data) {


  return new Promise((resolve, reject) => {
    let query = `insert into email_cliente(email,label,cod_cliente) values ($1,$2,$3)`
    client.query(query, [data.email, data.label, data.cod_cliente], (err, res) => {
      if (err) {
        console.error(err);
        reject(err);
      }

      resolve(res);
      console.log("emails inserted");
    })

  });
}
function deleteEmails(cod_cliente) {


  return new Promise((resolve, reject) => {
    let query = `delete from email_cliente where cod_cliente=$1`
    client.query(query, [cod_cliente], (err, res) => {
      if (err) {
        console.error(err);
        reject(err);
      }

      resolve(res);
      console.log("emails deleted");
    })

  });
}

function insertCelulares(data) {

  return new Promise((resolve, reject) => {
    let query = `insert into celular_cliente(numero,label,cod_cliente) values ($1,$2,$3)`
    client.query(query, [data.numero, data.label, data.cod_cliente], (err, res) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      console.log("celulares inserted");
      resolve(res);
    })

  });
}

function deleteCelulares(cod_cliente) {


  return new Promise((resolve, reject) => {
    let query = `delete from celular_cliente where cod_cliente=$1`
    client.query(query, [cod_cliente], (err, res) => {
      if (err) {
        console.error(err);
        reject(err);
      }

      resolve(res);
      console.log("phones deleted");
    })

  });
}

function getNaturaleza() {
  var data = "*"
  var table = "naturaleza"
  return new Promise((resolve, reject) => {
    client.query(`select ${data} from ${table}`,[], (err, res) => {
      if (err) {
        console.error(err);
        reject(err);

      }
      resolve(res.rows);
    })
  })

}

function getNaturalezaById(id) {
  var data = "*"
  var table = "naturaleza"
  return new Promise((resolve, reject) => {
    client.query(`select ${data} from ${table} where cod_naturaleza = $1`, [id], (err, res) => {
      if (err) {
        console.error(err);
        reject(err);

      }
      resolve(res.rows);
    })
  })

}

/**
  Campos

 */

  function insertDocumento(data) {
    console.log(data);
    return new Promise((resolve, reject) => {
      let query = `insert into documento(nom_documento,cod_seguro,obligatorio) values ($1,$2,$3) RETURNING cod_documento`
      client.query(query, [data.nom_documento, data.cod_seguro, data.obligatorio], (err, res) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        console.log("document inserted");
        console.log(res.rows[0]);
        resolve(res.rows[0]);
      })
  
    });
  }

  function updateDocumento(data) {
    console.log(data)  
    return new Promise((resolve, reject) => {
      let query = `UPDATE documento SET nom_documento = $1, cod_seguro = $2, obligatorio = $3 WHERE cod_documento =$4 RETURNING cod_documento`
      client.query(query, [data.nom_documento, data.cod_seguro, data.obligatorio, data.id], (err, res) => {
        if (err) {
          console.log('error aqui' + err.message);
          console.error(err);
          reject(err);
        }
        console.log("Document updated" + res.rows[0]);
        resolve(res.rows[0]);
      })
  
    });
  }

  function deleteDocumento(id) {
    console.log(id)  
    return new Promise(( reject) => {
      let query = `delete from documento WHERE cod_documento =$1 RETURNING cod_documento`
      client.query(query, [id], (err) => {
        if (err) {
          console.log('error aqui' + err.message);
          console.error(err);
          reject(err);
        }
        console.log("Document deleted");
        
      })
  
    });
  }
 


  function getCamposPorSeguro(id) {    
    return new Promise((resolve, reject) => {
      client.query(`SELECT campo_seguro.cod_campo_seguro, campo_seguro.cod_campo, campo_seguro.cod_seguro, campo.cod_campo, campo.nom_campo   
      FROM campo  
      INNER JOIN campo_seguro  
      ON campo.cod_campo = campo_seguro.cod_campo  
      WHERE campo_seguro.cod_seguro = $1`, [id], (err, res) => {

        if (err) {
          console.error(err);
          reject(err);  
        }  
        resolve(res.rows);
      })
    });
  }

  function listCampos() {    
    return new Promise((resolve, reject) => {
      client.query(`SELECT campo_seguro.cod_campo_seguro, campo_seguro.cod_campo, campo_seguro.cod_seguro, campo.cod_campo, campo.nom_campo   
      FROM campo  
      INNER JOIN campo_seguro  
      ON campo.cod_campo = campo_seguro.cod_campo  
      ORDER BY cod_campo_seguro;`, (err, res) => {
        if (err) {
          console.error(err);
          reject(err);
  
        }
        console.log('campos fetched');
  
        resolve(res.rows);
      })
    })
  }
  
  /**
  Seguros

 */

  function insertSeguro(data) {
    console.log(data);
    return new Promise((resolve, reject) => {
      let query = `insert into seguro(cod_tipo_seguro,vigencia,cod_compania,precio) values ($1,$2,$3,$4) RETURNING cod_tipo_seguro`
      client.query(query, [data.cod_tipo_seguro, data.vigencia, data.cod_compania, data.precio], (err, res) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        console.log("Insurance inserted");
        console.log(res.rows[0]);
        resolve(res.rows[0]);
      })
  
    });
  }

  function updateSeguro(data) {
    console.log(data)  
    return new Promise((resolve, reject) => {
      let query = `UPDATE seguro SET cod_tipo_seguro = $1, vigencia = $2, cod_compania = $3, precio=$4 WHERE cod_seguro =$5 RETURNING cod_tipo_seguro`
      client.query(query, [data.cod_tipo_seguro, data.vigencia, data.cod_compania, data.precio,data.id], (err, res) => {
        if (err) {
          console.log('error aqui' + err.message);
          console.error(err);
          reject(err);
        }
        console.log("Insurance updated" + res.rows[0]);
        resolve(res.rows[0]);
      })
  
    });
  }

  function deleteSeguro(id) {
    console.log(id)  
    return new Promise(( reject) => {
      let query = `delete from seguro WHERE cod_seguro =$1 RETURNING cod_seguro`
      client.query(query, [id], (err) => {
        if (err) {
          console.log('error aqui' + err.message);
          console.error(err);
          reject(err);
        }
        console.log("Insurance deleted");
        
      })
  
    });
  }

  function getSeguro(id) {    
    return new Promise((resolve, reject) => {
      client.query(`select * from seguro WHERE cod_seguro = $1`, [id], (err, res) => {
        if (err) {
          console.error(err);
          reject(err);  
        }  
        resolve(res.rows[0]);
      })
    });
  }

  function listSeguros() {    
    return new Promise((resolve, reject) => {
      client.query(`SELECT seguro.cod_seguro, seguro.cod_tipo_seguro,tipo_seguro.nom_tipo_seguro, seguro.vigencia,seguro.cod_compania, compania.nom_compania,seguro.precio, seguro.descripcion, seguro.resumen
      FROM seguro  
      INNER JOIN tipo_seguro  
      ON seguro.cod_tipo_seguro = tipo_seguro.cod_tipo_seguro
      INNER JOIN compania  
      ON seguro.cod_compania = compania.cod_compania`, (err, res) => {
        if (err) {
          console.error(err);
          reject(err);
  
        }
        console.log('insurance fetched');
        console.log(res.rows);
        resolve(res.rows);
      })
    })
  }

/**
   * 
   * Tipo seguros
   */
   function listTipoSeguros() {    
    return new Promise((resolve, reject) => {
      client.query(`select * from tipo_seguro`, (err, res) => {
        if (err) {
          console.error(err);
          reject(err);
  
        }
        console.log('insurance type fetched');
  
        resolve(res.rows);
      })
    })
  }
  /*
  

  Procesos

  */

  function getNumeroCamposSeguro(id) {    
    return new Promise((resolve, reject) => {
      
      client.query(`SELECT campo_seguro.cod_campo_seguro, campo_seguro.cod_campo, campo_seguro.cod_seguro, campo.cod_campo, campo.nom_campo   
      FROM campo  
      INNER JOIN campo_seguro  
      ON campo.cod_campo = campo_seguro.cod_campo  
      WHERE campo_seguro.cod_seguro = $1`, [id], (err, res) => {
        if (err) {
          console.error(err);
          reject(err);
  
        }                       
        //console.log(res.rows);        
        resolve(res.rows);

      });
    }
    )    
  }

  function getNCamposListosProceso(id) {    
    return new Promise((resolve, reject) => {
      
      client.query(`select count(url)
      from anexo_proceso
      inner join proceso
      on proceso.cod_proceso = anexo_proceso.cod_proceso
      where proceso.cod_proceso= $1
      and url !=''`, [id], (err, res) => {
        if (err) {
          console.error(err);
          reject(err);
  
        }                       
        //console.log(res.rows[0].count);    
        
        resolve(res.rows[0].count);

      });
    }
    )    
  }
  function searchProcesos(key) {    
    return new Promise((resolve, reject) => {
      let newQuery = '%'+key+'%';
      console.log('test '+newQuery);
      
      client.query(`select cod_proceso, nom_cliente, apellido_cliente, cliente.cedula, nom_tipo_seguro, nom_status, nom_usuario, fecha_inicio
      from proceso
      inner join cliente 
      on proceso.cod_cliente = cliente.cod_cliente
      inner join seguro
      on proceso.cod_seguro = seguro.cod_seguro
      inner join tipo_seguro
      on seguro.cod_tipo_seguro = tipo_seguro.cod_tipo_seguro
      inner join status
      on proceso.cod_status = status.cod_status
      inner join usuario
      on proceso.cod_usuario = usuario.cod_usuario
      WHERE nom_cliente LIKE $1 OR apellido_cliente LIKE $1 OR  cliente.cedula LIKE $1 OR nom_tipo_seguro LIKE $1 LIMIT 10`,[newQuery], (err, res) => {
        if (err) {
          console.error(err);
          reject(err);
  
        }        
        console.log('processs searched');        
        //console.log(res.rows);    
        
        resolve(res.rows);

      });
    }
    )    
  }

  function getAllCodProcesos() {    
    return new Promise((resolve, reject) => {
      
      client.query(`select * from proceso`, (err, res) => {
        if (err) {
          console.error(err);
          reject(err);
  
        }        
        console.log('processs fetched');        
        //console.log(res.rows);    
        
        resolve(res.rows);

      });
    }
    )    
  }

  
  function countProcesos() {
    return new Promise((resolve, reject) => {
      
      client.query(`SELECT COUNT(*) FROM proceso`, (err, res) => {
        if (err) {
          console.error(err);
          reject(err);
  
        }        
        console.log('processs counted');        
        //console.log(res.rows);    
        
        resolve(res.rows);

      });
    }
    )   
  }



  function listProcesos(start, end) {    
    return new Promise((resolve, reject) => {
      
      client.query(`select cod_proceso, nom_cliente, apellido_cliente, proceso.cod_seguro, nom_tipo_seguro, nom_status, nom_usuario, fecha_inicio
      from proceso
      inner join cliente 
      on proceso.cod_cliente = cliente.cod_cliente
      inner join seguro
      on proceso.cod_seguro = seguro.cod_seguro
      inner join tipo_seguro
      on seguro.cod_tipo_seguro = tipo_seguro.cod_tipo_seguro
      inner join status
      on proceso.cod_status = status.cod_status
      inner join usuario
      on proceso.cod_usuario = usuario.cod_usuario WHERE cod_proceso >= $1 and cod_proceso <= $2  ORDER BY cod_proceso`,[start, end], (err, res) => {
        if (err) {
          console.error(err);
          reject(err);
  
        }        
        console.log('processs fetched');        
        //console.log(res.rows);    
        
        resolve(res.rows);

      });
    }
    )    
  }
  function insertProceso(data) {
    
    return new Promise((resolve, reject) => {
      let query = `insert into proceso(cod_seguro,cod_usuario,cod_cliente,cod_status,fecha_inicio,fecha_final) values ($1,$2,$3,$4,$5,$6) RETURNING cod_proceso`
      client.query(query, [data.cod_seguro, data.cod_usuario, data.cod_cliente, data.cod_status, data.fecha_inicio, data.fecha_final], (err, res) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        console.log("process inserted");
        console.log(res.rows[0]);
        resolve(res.rows[0]);
      })
  
    });
  }

  function getProcesoById(id) {

    return new Promise((resolve, reject) => {
      client.query(`select cod_proceso, nom_cliente, apellido_cliente, proceso.cod_seguro, nom_tipo_seguro, nom_status, nom_usuario, fecha_inicio
      from proceso
      inner join cliente 
      on proceso.cod_cliente = cliente.cod_cliente
      inner join seguro
      on proceso.cod_seguro = seguro.cod_seguro
      inner join tipo_seguro
      on seguro.cod_tipo_seguro = tipo_seguro.cod_tipo_seguro
      inner join status
      on proceso.cod_status = status.cod_status
      inner join usuario
      on proceso.cod_usuario = usuario.cod_usuario WHERE cod_proceso = $1`, [id], (err, res) => {
        if (err) {
          console.error(err);
          reject(err);
  
        }
        resolve(res.rows[0]);
      })
    })
  }

  /*

  Anexos Procesos

  */

  function listAnexoProcesos() {    
    return new Promise((resolve, reject) => {
      client.query(`select * from anexo_proceso`, (err, res) => {
        if (err) {
          console.error(err);
          reject(err);
  
        }
        console.log('Anex processs fetched');
  
        resolve(res.rows);
      })
    })
  }
  function insertAnexoProceso(campo) {    
    return new Promise((resolve, reject) => {
      client.query(`insert into anexo_proceso(cod_proceso,valor,url) values ($1,$2,$3) RETURNING cod_anexo_proceso`,[campo.cod_proceso, campo.valor, campo.url], (err, res) => {
        if (err) {
          console.error(err);
          reject(err);
  
        }
        console.log('Anex processs inserted');
  
        resolve(res.rows[0]);
      })
    })
  }

  /*

  COMPÁÑIA

  */

  function listCompania() {    
    return new Promise((resolve, reject) => {
      client.query(`select * from compania`, (err, res) => {
        if (err) {
          console.error(err);
          reject(err);
  
        }
        console.log('compania fetched');
  
        resolve(res.rows);
      })
    })
  }

  function getCompaniaById(id) {
    
    return new Promise((resolve, reject) => {
      client.query(`select * from compania WHERE cod_compania=$1`, [id], (err, res) => {
        if (err) {
          console.error(err);
          reject(err);
  
        }
        resolve(res.rows[0]);
      })
    })
  }

  function insertCompania(campo) {    
    return new Promise((resolve, reject) => {
      client.query(`insert into compania(nom_compania,direccion_compania) values ($1,$2) RETURNING cod_compania`,[campo.nom_compania, campo.direccion_compania], (err, res) => {
        if (err) {
          console.error(err);
          reject(err);
  
        }
        console.log('Anex processs inserted');
  
        resolve(res.rows[0]);
      })
    })
  }

  function updateCompania(data) {
  
  
    return new Promise((resolve, reject) => {
      
      let query = `UPDATE compania SET nom_compania = $1 WHERE cod_compania =$2`
    
      client.query(query, [data.nom_compania,data.cod_compania], (err, res) => {
        if (err) {
          console.log('error aqui' + err.message);
          console.error(err);
          reject(err);
        }
        console.log("user updated" + res.rows);
        resolve(res.rows);
      })
  
    });
  }
 /**
  * ramo
  */

  function listRamo() {    
    return new Promise((resolve, reject) => {
      client.query(`select * from ramo`, (err, res) => {
        if (err) {
          console.error(err);
          reject(err);
  
        }
        console.log('compania fetched');
  
        resolve(res.rows);
      })
    })
  }

  function getRamoByCompany(id) {
    
    return new Promise((resolve, reject) => {
      client.query(`select * from ramo WHERE cod_compania=$1`, [id], (err, res) => {
        if (err) {
          console.error(err);
          reject(err);
  
        }
        resolve(res.rows[0]);
      })
    })
  }

  function insertRamo(campo) {    
    return new Promise((resolve, reject) => {
      client.query(`insert into ramo(nom_ramo,cod_compania) values ($1,$2) RETURNING cod_ramo`,[campo.nom_ramo, campo.cod_compania], (err, res) => {
        if (err) {
          console.error(err);
          reject(err);
  
        }
  
        resolve(res.rows[0]);
      })
    })
  }

  function updateRamo(data) {
  
  
    return new Promise((resolve, reject) => {
      
      let query = `UPDATE ramo SET nom_ramo = $1 WHERE cod_ramo =$2`
    
      client.query(query, [data.nom_ramo,data.cod_ramo], (err, res) => {
        if (err) {
          console.log('error aqui' + err.message);
          console.error(err);
          reject(err);
        }
        console.log("ramo updated" + res.rows);
        resolve(res.rows);
      })
  
    });
  }

  /**
   * producto
   */


   function listProducto() {    
    return new Promise((resolve, reject) => {
      client.query(`select * from producto`, (err, res) => {
        if (err) {
          console.error(err);
          reject(err);
  
        }
  
        resolve(res.rows);
      })
    })
  }

  function getProductoByRamo(id) {
    
    return new Promise((resolve, reject) => {
      client.query(`select * from producto WHERE cod_ramo=$1`, [id], (err, res) => {
        if (err) {
          console.error(err);
          reject(err);
  
        }
        resolve(res.rows[0]);
      })
    })
  }

  function insertProducto(campo) {    
    return new Promise((resolve, reject) => {
      client.query(`insert into producto(nom_producto,cod_ramo) values ($1,$2) RETURNING cod_producto`,[campo.nom_ramo, campo.cod_ramo], (err, res) => {
        if (err) {
          console.error(err);
          reject(err);
  
        }
  
        resolve(res.rows[0]);
      })
    })
  }

  function updateProducto(data) {
  
  
    return new Promise((resolve, reject) => {
      
      let query = `UPDATE producto SET nom_producto = $1 WHERE cod_producto =$2`
    
      client.query(query, [data.nom_producto,data.cod_producto], (err, res) => {
        if (err) {
          console.log('error aqui' + err.message);
          console.error(err);
          reject(err);
        }
        console.log("ramo updated" + res.rows);
        resolve(res.rows);
      })
  
    });
  }
  

module.exports = {
  list,
  get,
  getUserByEmail,
  insertUser,
  updateUser,
  insertAuth,
  listClients,
  getClient,
  updateClient,
  getClientEmails,
  getClientPhones,
  insertClient,
  insertEmails,
  deleteEmails,
  insertCelulares,
  deleteCelulares,
  getClientByDocument,
  getNaturaleza,
  getNaturalezaById,

  insertDocumento,
  updateDocumento,
  deleteDocumento,


  getCamposPorSeguro,

  listCampos,
  insertSeguro,
  updateSeguro,
  deleteSeguro,
  getSeguro,
  listSeguros,
  insertClientToGetId,
  removeClient,
  listProcesos,
  countProcesos,
  listAnexoProcesos,
  getEmpleados,
  getEmpleadoById,
  insertEmpleadoById,
  getNCamposListosProceso,
  getNumeroCamposSeguro,
  listTipoSeguros,
  getAllCodProcesos,
  searchProcesos,
  insertProceso,
  getProcesoById,
  insertAnexoProceso,
  listTipoSeguros,
  removeUser,
  listCompania,
  insertCompania,
  getCompaniaById,
  updateCompania,
  listRamo,
  getRamoByCompany,
  insertRamo,
  updateRamo,
  listProducto,
  getProductoByRamo,
  insertProducto,
  updateProducto

}