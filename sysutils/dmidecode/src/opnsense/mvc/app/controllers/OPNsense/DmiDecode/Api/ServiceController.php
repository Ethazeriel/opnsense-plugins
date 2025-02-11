<?php
namespace OPNsense\dmidecode\Api;

use \OPNsense\Base\ApiControllerBase;
use \OPNsense\Core\Backend;
class ServiceController extends ApiControllerBase
{
  public function getAction()
  {
    $status = "failed";
    $system = array();
    $bios = array();
    if ($this->request->isGet()) {
      foreach (explode("\n", trim((new Backend())->configdRun('dmidecode system'))) as $item) {
        [$newkey, $newval] = explode(" = ", $item);
        $system[$newkey] = $newval;
      }
      foreach (explode("\n", trim((new Backend())->configdRun('dmidecode bios'))) as $item) {
        [$newkey, $newval] = explode(" = ", $item);
        $bios[$newkey] = $newval;
      }
      $status = "ok";
    }
    return ["status" => $status, "system" => $system, "bios" => $bios];
  }
}