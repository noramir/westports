<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Export Booking Excel to Coprar Converter</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- bootstrap css -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
    </head>
    <body>
        <div class="wrapper">
            <div class="container">
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title">Export Booking Excel to Coprar Converter</h5>
                    </div>
                    <div class="card-body">
                        <!-- <form action="" method="POST"> -->
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Receiver Code</label>
                            <div class="col-sm-10">
                                <input class="form-control" type="text" name="in_code" id="in_code" placeholder="Receiver">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2">Input spreadsheet</label>
                            <div class="col-sm-10">
                                <input type="file" class="form-control-file" name="sel_file" id="sel_file">
                            </div>
                        </div>
                        <div class="form-group">
                            <textarea class="form-control" rows="15" cols="40" id="data_out"></textarea>
                        </div>
                        <!-- </form> -->
                    </div>
                </div>
            </div>
        </div>

        <!-- js for converting -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.0/jszip.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.0/xlsx.js"></script>

        <!-- jquery -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

        <!-- bootstrap js -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>

        <script>
            <?php include 'script.js' ?>
        </script>
    </body>
</html>