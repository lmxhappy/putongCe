    
$(function(){
                        /*
                        $(".toNewTestUrl").click(function(){
                                alert();
                        });
                        */


                        $(".getDetail").click(function(){
				var theTr = $(this).parents('tr');
				console.log(theTr);
				//theTr.addClass('selected');
				//$(theTr).addClass('selected');
				
				var backgroundColor = $(theTr).css('background-color');
				/*
				alert(backgroundColor);
				*/

				$(theTr).css('background-color', 'aqua');
				var otherTr = theTr.siblings();
				console.log(otherTr);
				$(otherTr).css('background-color', 'rgba(0,0, 0, 0)');

				var urlId = $(this).attr('urlId');
				var clientId = $(this).attr('clientId');
//				alert(clientId);
				$("#resultDetail").show();
                                $.post(
                                        "/Admin/Index/getResultbyClient",
                                        {'clientId':clientId, 'urlId':urlId},
                                        function(result){
                                                //console.log(result);
                                                
						var tbody = "";	
                                                $.each(result, function(k,v){
                                                        //console.log(v);
							var existHeartXml = "";
							if(parseInt(v.existHeart))
							{
								existHeartXml = '<span class="glyphicon glyphicon-ok"></span>';
							}
							else
							{
								existHeartXml = '<span class="glyphicon glyphicon-remove"></span>';
							}

							var haveChosenXml = "";
							if(parseInt(v.haveChosenXml))
							{
								haveChosenXml = '<span class="glyphicon glyphicon-ok"></span>';
							}
							else
							{
								haveChosenXml = '<span class="glyphicon glyphicon-remove"></span>';
							}

							var trXml='<tr>'+	
									'<td>' +v.testSerial +'</td>'+
									'<td>' + existHeartXml +'</td>'+
									'<td>' + haveChosenXml +'</td>'+
									'<td>' + v.choiceTime+'</td>'+
									'<td>' + v.choiceTimeLen+'</td>'+
									'<td>' + v.create_time+'</td>'+
								  '</tr>';


							tbody += trXml;

							var pos = $("#resultDetail tbody");
							//console.log(pos);
							//console.log(trXml);
                                                });
						//console.log(tbody);
						$("#resultBody").html("");
						$("#resultBody").append(tbody);
						
						/*for(var i=0;i<result.length;i++)
						{
							var item = result[i];
							console.log(item);
						}
						*/
                                        },
					"json"
                                );
                                
                        });
                        
});
