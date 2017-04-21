import {SqlTable} from "../../platform/components/sql/SqlTable";
import {SqlTableColumn} from "../../platform/components/sql/SqlTableColumn";

export class Организация_SqlTable extends SqlTable {

    //=== BEGIN-DESIGNER-DECLARE-CODE ===//

    Номер_column: SqlTableColumn = new SqlTableColumn();
    Название_column: SqlTableColumn = new SqlTableColumn();

    //=== END-DESIGNER-DECLARE-CODE ===//

    init() {
        super.init();

        //=== BEGIN-DESIGNER-INIT-CODE ===//
        this.name = "Организация";

        this.Номер_column.name = "Номер";
        this.childrenAdd(this.Номер_column);

        this.Название_column.name = "Название";
        this.childrenAdd(this.Название_column);

        //=== END-DESIGNER-INIT-CODE ===//
    }


}