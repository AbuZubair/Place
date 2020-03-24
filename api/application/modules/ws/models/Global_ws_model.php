<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Global_ws_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function get_prov()
    {
        # code...
        return $this->db->order_by('name', 'asc')->get_where('provinces',array())->result();
    }

    public function get_regency($q)
    {
        # code...
        return $this->db->order_by('name', 'asc')->get_where('regencies',array('province_id' => $q))->result();

    }

    public function get_district($q)
    {
        # code...
        return $this->db->order_by('name', 'asc')->get_where('districts',array('regency_id' => $q))->result();

    }

}
