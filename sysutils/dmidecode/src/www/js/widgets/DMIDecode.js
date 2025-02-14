export default class DMIDecode extends BaseTableWidget {
  constructor() {
    super();
    this.title = 'DMIDecode data';
    this.tickTimeout = 120;
  }

  getGridOptions() {
    return {
      sizeToContent: 350
    
    }
  }

  getMarkup() {
    let $container = $('<div></div>');
    let $dmi_table = super.createTable('dmiTable', {
      headerPosition: 'top',
      headers: [
        'item',
        'value'
      ]
    });

    $container.append($dmi_table);
    return $container;
  }

  async onMarkupRendered() {
    const dmiData = await this.ajaxCall('/api/dmidecode/service/get');
    if (!dmiData || dmiData?.status !== 'No error') {
      this.displayError('dmi lookup failed');
      return;
    }
    this.processDMIData(dmiData);
  }

  processDMIData(data) {
    const rows = [];
    for (const [key, value] of Object.entries(data.system)) {
      // do something with it, I dunno
      const row = [];
      row.push(`<div>${key}</div>`, `<div>${value}</div>`);
      rows.push(row);
    }
    for (const [key, value] of Object.entries(data.bios)) {
      const row = [];
      row.push(`<div>${key}</div>`, `<div>${value}</div>`);
      rows.push(row);
    }
    super.updateTable('dmiTable', rows);
  }

  displayError(message) {
    const $error = $(`
        <div class="error-message">
            ${message}
        </div>
    `);
    $('#dmiTable').empty().append($error);
}

}






// $hardwareData = parse_ini_string(configd_run("dmidecode system"), FALSE, INI_SCANNER_RAW);
// $biosData = parse_ini_string(configd_run("dmidecode bios"), FALSE, INI_SCANNER_RAW);

// ?>
// <table class="table table-striped table-condensed">
//     <tbody>
//         <tr><th colspan="2"><?=gettext("Platform");?></th></tr>
//         <?php foreach($hardwareData as $key => $val) { ?>
//         <tr>
//             <td style="width: 30%;"><?=gettext($key);?></td>
//             <td><?=html_safe($val);?></td>
//         </tr>
//         <?php } ?>
//         <tr><th colspan="2"><?=gettext("BIOS");?></th></tr>
//         <?php foreach($biosData as $key => $val) { ?>
//         <tr>
//             <td style="width: 30%;"><?=gettext($key);?></td>
//             <td><?=html_safe($val);?></td>
//         </tr>
//         <?php } ?>
//     </tbody>
// </table>