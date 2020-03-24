<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Global_ws extends MX_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('Global_ws_model');
    }

    public function get_prov()
    {
        # code...
        $data = $this->Global_ws_model->get_prov();

        echo json_encode(array('status' => 200, 'message' => 'Sukses', 'data' => $data));
    }

    public function get_regency()
    {
        # code...
        $data = $this->Global_ws_model->get_regency($_GET['q']);

        echo json_encode(array('status' => 200, 'message' => 'Sukses', 'data' => $data));
    }

    public function get_district()
    {
        # code...
        $data = $this->Global_ws_model->get_district($_GET['q']);

        echo json_encode(array('status' => 200, 'message' => 'Sukses', 'data' => $data));
    }


}

/* End of file empty_module.php */
/* Location: ./application/modules/empty_module/controllers/empty_module.php */

