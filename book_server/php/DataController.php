<?php
require_once "lib/DevExtreme/LoadHelper.php";
spl_autoload_register(array("DevExtreme\LoadHelper", "LoadModule"));

use DevExtreme\DataSourceLoader;
use DevExtreme\DbSet;

class DataController
{
    private $dbSet;
    public function test()
    {
        // Create connection test
        $conn = mysqli_connect("localhost", "payeshir_patogh", "4hkrAMctO7475IjU", "payeshir_patogh");
        // Check connection
        if (!$conn) {
            die("Connection failed: " . mysqli_connect_error());
        }
        echo "Connected successfully \r\n";
        $sql = "SELECT *
                  FROM `book`
                  LIMIT 50";
        $result = $conn->query($sql);
		/* Select queries return a resultset */
	if ($result = $conn->query("SELECT * FROM book LIMIT 10")) {
   	 printf("Select returned %d rows.\n", $result->num_rows);
    /* free result set */
    $conn->close();
	}
	else{
		 echo("Error description: " . $conn -> error);
	}
        exit;
        if ($result->num_rows > 0) {
            // output data of each row
            if ($row = $result->fetch_assoc()) {
                var_dump($row);
                exit;
            }
        } else {
            echo "0 results";
        }
        $conn->close();

        exit;
    }
    public function __construct($params)
    {

        //$this->test();
        //TODO: use your database credentials
        // $mySQL = new mysqli("localhost","amir_sanji","0925797571", "my_db");
        $mySQL = new mysqli("localhost", "payeshir_patogh", "4hkrAMctO7475IjU", "payeshir_patogh");
        $this->dbSet = new DbSet($mySQL, $params['TABLE_NAME']);
        $this->keyPrimary = $params['KEY'];//ROW';
    }
    public function FillDbIfEmpty()
    {
        if ($this->dbSet->GetCount() == 0) {
            $curDateString = "2013-1-1";
            for ($i = 1; $i <= 10000; $i++) {
                $curDT = new DateTime($curDateString);
                $curDT->add(new DateInterval("P" . strval(rand(1, 1500)) . "D"));
                $item = array(
                    "Name" => "Name_" . strval(rand(1, 100)),
                    "Category" => "Category_" . strval(rand(1, 30)),
                    "CustomerName" => "Customer_" . strval(rand(1, 50)),
                    "BDate" => $curDT->format("Y-m-d"),
                );
                $this->dbSet->Insert($item);
            }
        }
    }

    public function Get($params)
    {

        $result = DataSourceLoader::Load($this->dbSet, $params);
        if (!isset($result)) {
            $result =  $this->dbSet->error;
            //$result = $this->dbSet->GetLastError();
        }
        return $result;
    }
    public function Post($values)
    {
        $result = $this->dbSet->Insert($values);
        if (!isset($result)) {
            $result = $this->dbSet->GetLastError();
        }
        return $result;
    }
    public function Put($key, $values)
    {
        $result = null;
        if (isset($key) && isset($values) && is_array($values)) {
            if (!is_array($key)) {
                $keyVal = $key;
                $key = array();
                $key[$this->keyPrimary] = $keyVal;
            }
            $result = $this->dbSet->Update($key, $values);
            if (!isset($result)) {
                $result = $this->dbSet->GetLastError();
            }
        } else {
            throw new Exeption("Invalid params");
        }
        return $result;
    }
    public function Delete($key)
    {
        $result = null;
        if (isset($key)) {
            if (!is_array($key)) {
                $keyVal = $key;
                $key = array();
                $key[$this->keyPrimary] = $keyVal;
            }
            $result = $this->dbSet->Delete($key);
            if (!isset($result)) {
                $result = $this->dbSet->GetLastError();
            }
        } else {
            throw new Exeption("Invalid params");
        }
        return $result;
    }
}
