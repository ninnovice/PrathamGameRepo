    var Assessment = {};

    $(document).ready(function () {
        window.history.pushState({}, "", "/#");
        Assessment.getData(false, Assessment.FillTaffy, DATA());
        Assessment.TaffyFilled = false;
        $("#file2").on("change", Assessment.setFileInfo);
        $("#media").on("change", Assessment.setFileInfo);
        $("#upload").on('click', Assessment.Upload);
        $("#getData").on('click', function () {
            var data = {};
            data.Download = true;
            data.Subject = $("#subjects").val();
            data.Language = $("#languages").val();
            Assessment.getData(true, Assessment.DownloadSample, data);
        });

        $("#Logo").on('click', function () { window.location.reload(); })
        
        $("#preview").on('click', function () {
            Assessment.preview("Select Type", "Yes No Type Questions", "Media Type Questions", "text", "media", function (result) {
                Assessment.DataForQuery.QuestionType = result;
                Assessment.preview("Select Language", "Hindi", "Marathi", "2", "3", Assessment.Play)
            });
        });
        $("select").selectpicker();

        window.addEventListener('popstate', function () {
            history.pushState(null, null, document.title);
            Utils.BackPress();
        });
    });


    Assessment.DownloadSample = function (path) {
        fetch.modal('hide');
        var element = $("<a id='sample' href='"+path+"' download></a>");
        $('body').append(element);
        element = document.getElementById('sample');
        element.click();
        $("#sample").remove();
    };


    Assessment.setFileInfo = function () {
        var TypeOfFile = $(this).val().split('.').pop().toLowerCase(), array = ['mp3', 'mp4', 'png', 'jpg', 'jpeg'], excel = false;
            if ($(this).prop('id') === "file2") {
                array = ['xlsx'];
                excel = true;
            }
            if ($.inArray(TypeOfFile, array) == -1) {
                bootbox.alert({ message: "Upload "+array.toString()+" Only." });
                $(this).val("");
                return false;
            }

            var file = this.files[0];
            if (excel) {
                formdata = new FormData(this);
                formdata.append('file', file);
                Assessment.Upload();
            } else {
                var exists = DB({ "Source": file.name }).get();
                if (!exists.length) {
                    if (this.files && this.files[0]) {
                        var reader = new FileReader();
                        reader.onload = function () { Utils.UploadMedia(event, TypeOfFile, file); };
                        reader.readAsDataURL(this.files[0]);
                    }
                } else {
                    bootbox.confirm({
                        message: "File Exists. Do you want to over-write it?",
                        buttons: {
                            confirm: {
                                label: 'Yes',
                                className: 'btn-primary'
                            },
                            cancel: {
                                label: 'No',
                                className: 'btn-default'
                            }
                        },
                        callback: function (result) {
                            if (result) {
                                    var reader = new FileReader();
                                    reader.onload = function () { Utils.UploadMedia(event, TypeOfFile, file); };
                                    reader.readAsDataURL(file);
                            }
                        }
                    });
                }
            }
    };

    Assessment.Upload = function () {

        upload = bootbox.dialog({
            message: '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>  Uploading...',
            closeButton: false
        });

        $.ajax({
            type: 'POST',
            data: formdata,
            contentType: false,
            url: "Assessment/UploadExcel",
            processData: false,
            success : Assessment.Uploaded
        });
    };

    Assessment.Uploaded = function (response) {
        if (response === "Data Uploaded") {
            upload.init(function () {
                upload.find('.bootbox-body').html('<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>  Verifying Data...');
            });

            $.ajax({
                type: 'POST',
                url: "Assessment/VerifyData",
                success: function (response) {
                    if (response !== "FATLA") {
                        Assessment.DataLoadComplete(true, "File Uploaded");
                        if(response != "success")
                            Assessment.DownloadSample(response);
                    } else {
                        Assessment.DataLoadComplete(false);
                    }
                }
            });
        } else {
                Assessment.DataLoadComplete(false, response);
        }
    };


    Assessment.DataLoadComplete = function (success, message) {
        $("#file2").val("");
        formdata = new FormData();
        upload.modal('hide');
        setTimeout(function () { bootbox.alert({ message: message}), 100 });
    }

    Assessment.getData = function (download, callback, data) {
            fetch = bootbox.dialog({
                    message: '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>  Fetching Data...',
                    closeButton: false
                });

            $.ajax({
                type: 'GET',
                data :data,
                url: "Assessment/getData",
                success: callback,
                datatype: "application/json"
            });
    };

    Assessment.preview = function (title, text1, text2, val1, val2, callback) {
        bootbox.prompt({
            title: title,
            inputType: 'select',
            inputOptions: [
                {
                    text: text1,
                    value: val1,
                },
                {
                    text: text2,
                    value: val2,
                },
            ],
            callback: callback
        });
        $("select").selectpicker();
    };

    Assessment.FillTaffy = function (response) {
        fetch.modal('hide');
        DB = TAFFY();
        DB.insert(response);
        Assessment.TaffyFilled = true;
    }

    Assessment.Play = function (result) {
        if (result != null) {
            Assessment.selectedLanguage = result;
            if (!Assessment.TaffyFilled)
                Assessment.getData(false, Assessment.FillTaffy, DATA());
            else
                Assessment.WebReady();
            $("#ExcelContainer, #Select").hide();
            $("#Container").show();
            Assessment.WebReady();
        }
    };

    Assessment.Reload = function () {
        $("#Container").hide();
        $("#ExcelContainer").show();
    };