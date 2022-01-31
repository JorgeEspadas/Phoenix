import React from "react";
import { Accordion } from "react-bootstrap";

function IESResultExposer({ data, number }) {
  // the whole purpose of this file is to contain the data of each result
  // map it
  // show a table and show the graph.

  // TWO TYPES OF DATA TO SHOW.
  // 1. DATA HAS A RESULT ARRAY, SHOW GRAPH, TABLE.
  // 2. DATA HAS AN EMPTY RESULT ARRAY, SHOW SOMETHING ELSE(?) A BUTTON.

  // BODY IS ANOTHER ACCORDION WITH EVERY QUESTION   INNIT
  /**
     * {
                                "id": "ies_5",
                                "texto": "La IES pertenece al",
                                "resultados": [
                                    {
                                        "texto": "Subsistema de universidades publicas",
                                        "total": 0
                                    },
                                    {
                                        "texto": "Subsistema de educacion tecnologica",
                                        "total": 2
                                    },
                                    {
                                        "texto": "Subsistema de instituciones particulares",
                                        "total": 0
                                    }
                                ]
                            },
     */

  var id = data.id;

  // PARA LA TABLA DE RESULTADOS NECESITO LOS TEXTOS DE CADA RESPUESTA.

  return (
    <div>
      {id.toString().startsWith("ies_") ? (
        <div>
          <Accordion>
            <Accordion.Item eventKey={data.id}>
              <Accordion.Header>{data.texto}</Accordion.Header>
              <Accordion.Body></Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      ) : (
        <div>Module Not Done</div>
      )}
    </div>
  );
}

export default IESResultExposer;
