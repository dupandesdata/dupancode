    $(document).ready(function(){
        $('.btn-copy').on("click", function(){
            var value = $('#text-copy').text();
           
            var $tempCopy = $("<input>");
                $("body").append($tempCopy);
                $tempCopy.val(value).select();
                document.execCommand("copy");
                $tempCopy.remove();
        })
    })
