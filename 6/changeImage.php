<?
$thumb_directory =  "tmb/";         //Папка для миниатюр 
$orig_directory = "img/";           //Папка для полноразмерных изображений 

$dir_handle = @opendir($orig_directory);    //Открываем папку с полноразмерными изображениями 
if ($dir_handle > 1){               //Проверяем, что папка открыта и в ней есть файлы

    $allowed_types=array('jpg','jpeg','gif','png'); // Список обрабатываемых расширений
    $file_parts=array();
    $ext='';
    $title='';
    $i=0;

    while ($file = @readdir($dir_handle))
    {
        /* Пропускаем системные файлы: */
        // if($file=='.' || $file == '..') continue;

    $file_parts = explode('.',$file);       //Разделяем имя файла на части 
    $ext = strtolower(array_pop($file_parts));

    /* Используем имя файла (без расширения) как заголовок изображения: */
    $title = implode('.',$file_parts);
    $title = htmlspecialchars($title);

    /* Если расширение входит в список обрабатываемых: */
    if(in_array($ext,$allowed_types))
    {

        /* Если планируется хранить изображения в БД, то код запроса будет здесь */

        $nw = 100;
        $nh = 100;
        $source = $orig_directory.$file;

        print('sourse = ' . $source);

        $stype = explode(".", $source);
        $stype = $stype[count($stype)-1];
        $dest = $thumb_directory . $file;
        print('dest = ' . $dest);

        $size = getimagesize($source);
        $w = $size[0];
        $h = $size[1];

        switch($stype) {
            case 'gif':
            $simg = imagecreatefromgif($source);
            break;
            case 'jpg':
            $simg = imagecreatefromjpeg($source);
            break;
            case 'png':
            $simg = imagecreatefrompng($source);
            break;
        }

        $dimg = imagecreatetruecolor($nw, $nh);
        $wm = $w/$nw;
        $hm = $h/$nh;
        
        imagecopyresampled($dimg,$simg,0,0,0,0,$nw,$nh,$w,$h);
        imagejpeg($dimg,$dest,100);

        imagedestroy($dimg); 

    }
}

/* Закрываем папку */
@closedir($dir_handle);

}
?>