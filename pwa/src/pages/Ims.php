<?php
session_start();
$id = $_SESSION['id'];
$email = $_SESSION['email'];
$uid = $_GET['uid'];

?>
<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">



    <!-- Bootstrap CSS -->
    <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"> -->
    <!-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">


    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>


    <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js"></script>


    <link rel="stylesheet" href="style.css">
    <!-- <link rel="stylesheet" href="bootstrap-tagsinput.css"> -->

    <title>Course Content</title>
</head>

<style>
.w-auto-sm-btn{width:fit-content;
font-size:16px;
  
}
.font18{
font-size:15px;    
}
    div.b {
        white-space: nowrap;
        width: 50px;
        overflow: hidden;
        text-overflow: ellipsis;
        border: 1px solid #000000;
    }

    .progressV {
        width: 80%;
        height: 5vh;
        margin-top: 100px;
        margin-left: 100px;
        border: 5px solid red;
        border-radius: 20px;
        align-content: flex-start;
        display: none;
    }

    .progressbarV {
        margin: 0;
        padding: 0;
        width: 30%;
        background: #12b0e5;
        height: 4vh;
        border-radius: 20px;

    }

    .progressA {
        width: 80%;
        height: 5vh;
        margin-top: 100px;
        margin-left: 100px;
        border: 5px solid red;
        border-radius: 20px;
        align-content: flex-start;
        display: none;
    }

    .progressbarA {
        margin: 0;
        padding: 0;
        width: 30%;
        background: #12b0e5;
        height: 4vh;
        border-radius: 20px;

    }

    .progressS {
        width: 80%;
        height: 5vh;
        margin-top: 100px;
        margin-left: 100px;
        border: 5px solid red;
        border-radius: 20px;
        align-content: flex-start;
        display: none;
    }

    .progressbarS {
        margin: 0;
        padding: 0;
        width: 30%;
        background: #12b0e5;
        height: 4vh;
        border-radius: 20px;

    }

    .progressF {
        width: 80%;
        height: 5vh;
        margin-top: 100px;
        margin-left: 100px;
        border: 5px solid red;
        border-radius: 20px;
        align-content: flex-start;
        display: none;
    }

    .progressbarF {
        margin: 0;
        padding: 0;
        width: 30%;
        background: #12b0e5;
        height: 4vh;
        border-radius: 20px;

    }

    .progressP {
        width: 80%;
        height: 5vh;
        margin-top: 100px;
        margin-left: 100px;
        border: 5px solid red;
        border-radius: 20px;
        align-content: flex-start;
        display: none;
    }

    .progressbarP {
        margin: 0;
        padding: 0;
        width: 30%;
        background: #12b0e5;
        height: 4vh;
        border-radius: 20px;

    }

    .CC-cta-btn {
        border: none;
        background-color: #333333;
        color: white;
        padding: 6px 24px;
        font-family: "Lato", sans-serif !important;
        border-right: 1px solid rgba(128, 128, 128, 0.508);
        font-size: 16px;
        margin: 0px 6px;
        border-radius: 10px;
    }
</style>

<!-- <button id="sidebar-toggle-btn">
    <a href="course_course-content.php">
        <img width="38px" src="icons/back.png" alt="" srcset="">
    </a>
</button> -->

<body>
    <div class="header-a">



        <div class="header-btn-block-a">
            <button id="sidebar-toggle-btn">
                <a href="course_course-content.php">
                    <img width="38px" src="icons/back.png" alt="" srcset="">
                </a>
            </button>

        </div>

        <div class="header-logo-icon-a">
            <div class="logo-block">
                <a href="">
                    <img style="margin: 5px 0px 7px 10px;" src="img/logo.JPG" alt="" srcset="">
                </a>

            </div>

            <div class="float-right" style="margin-top: 22px;">
                <a href="">
                    <img style="width: 29px; margin-right: 12px;" src="icons/gear.png" alt="" srcset="">
                </a>
                <a href="">
                    <img style="width: 29px; margin-right: 14px;" src="icons/bell.png" alt="" srcset="">
                </a>
                <a href="">
                    <img style="width: 23px; margin-right: 24px;" src="icons/chat.png" alt="" srcset="">
                </a>

            </div>

        </div>




    </div>

    <div id="courseContentSection" class="courseContent-block container-fluid ">
        <div class="row courseContentRo" style="margin-top:76px">
            <div class="CCSidebar " style="width:25%">
                <div class="students-img-block  px-5 text-center" style="padding-top:17.7px;padding-bottom:26px">
                    <img style="width: 100%;height:179px" id="tyleImg" src="" alt="" srcset="" class="my-auto">
                </div>


                <div id="CC-buttons-block" class="CC-cta-buttons-block justify-content-center">

                    <button id="CourseCoverBtn" class="CC-cta-btn">
                        <img width="25px" src="icons/Icon_FILL copy 4.png" alt="" srcset="">
                    </button>
                    <button id="priviewCourseBtn" onclick="previewCourse()" class="CC-cta-btn">
                        <img width="25px" src="icons/Icon_FILL copy 5.png" alt="" srcset="">
                    </button>
                    <button class="CC-cta-btn" onclick="createSample(); createSample1()">
                        <img width="25px" src="icons/Icon_FILL copy 6.png" alt="" srcset="">
                    </button>

                </div>
                <div id="sampleModeBtns" class="justify-content-center">
                    <button class="exitSampleBtn mr-2" onclick="exitSampleMode()"><i class="mr-2 fa fa-times fa-lg" aria-hidden="true"></i>Exit Sample Mode</button>
                    <button class="saveSampleBtn" id="saveSample">Save</button>

                </div>

                <ul class="navbar-nav mt-sm-3 mt-lg-4 bg-danger-" id="">
                    <li class="nav-item tablinks pl-5 pl-sm-5 py-3" onclick="openTabLink(event, 'try')" id="defaultOpen" hidden>


                    </li>
                    <div id="courseBuilderTitle"></div>

                    <!-- <li class="nav-item tablinks px-4 py-3" onclick="openTabLink(event, 'CCApple_1')" id="defaultOpen">

                        <div class="row">
                            <div class="col-10">
                                <span class="mr-3">
                                    <img width="22px" src="icons/next1.png" alt="" srcset="">

                                </span>


                                <span class="mr-3 align-middle">
                                    <img width="30px" src="icons/Icon_FILL copy.png" alt="" srcset="">
                                </span>
                                <span>
                                    Apple_1
                                </span>
                                <span class="CreateSampleCheckBox float-right">
                                    <input class="mr-2 float-right" style="width: 30px; height: 26px; vertical-align: middle;" type="checkbox" id="Watermark" name="Watermark" value="Watermark">

                                </span>
                            </div>
                            <div class="col-2">
                                <span>
                                    <i class="fa fa-ellipsis-v fa-sm float-right mt-2" aria-hidden="true"></i>
                                </span>
                            </div>

                        </div>
                    </li> -->

                    <!-- <li class="nav-item tablinks px-4 py-3" onclick="openTabLink(event, 'CCTextEditing_02')" id="defaultOpen">

                        <div class="row">
                            <div class="col-10">
                                <span class="mr-3">
                                    <img width="22px" src="icons/next1.png" alt="" srcset="">

                                </span>


                                <span class="mr-3 align-middle">
                                    <img width="30px" src="icons/Icon_FILL copy 2.png" alt="" srcset="">

                                </span>
                                <span>
                                    Text Editing_02
                                </span>
                                <span class="CreateSampleCheckBox float-right">
                                    <input class="mr-2 float-right" style="width: 30px; height: 26px; vertical-align: middle;" type="checkbox" id="Watermark" name="Watermark" value="Watermark">

                                </span>
                            </div>
                            <div class="col-2">
                                <span>
                                    <i class="fa fa-ellipsis-v fa-sm float-right mt-2" aria-hidden="true"></i>
                                </span>
                            </div>

                        </div>
                    </li>

                    <li class="nav-item tablinks px-4 py-3" onclick="openTabLink(event, 'CCApple_3')" id="defaultOpen">

                        <div class="row">
                            <div class="col-10">
                                <span class="mr-3">
                                    <img width="22px" src="icons/next1.png" alt="" srcset="">

                                </span>


                                <span class="mr-3 align-middle">
                                    <img width="30px" src="icons/Icon_FILL copy.png" alt="" srcset="">
                                </span>
                                <span>
                                    Apple_3
                                </span>
                                <span class="CreateSampleCheckBox float-right">
                                    <input class="mr-2 float-right" style="width: 30px; height: 26px; vertical-align: middle;" type="checkbox" id="Watermark" name="Watermark" value="Watermark">

                                </span>
                            </div>
                            <div class="col-2">
                                <span>
                                    <i class="fa fa-ellipsis-v fa-sm float-right mt-2" aria-hidden="true"></i>
                                </span>
                            </div>

                        </div>
                    </li>

                    <li class="nav-item tablinks px-4 py-3" onclick="openTabLink(event, 'CCApple_4')" id="defaultOpen">

                        <div class="row">
                            <div class="col-10">
                                <span class="mr-3">
                                    <img width="22px" src="icons/next1.png" alt="" srcset="">

                                </span>


                                <span class="mr-3 align-middle">
                                    <img width="30px" src="icons/Icon_FILL copy.png" alt="" srcset="">
                                </span>
                                <span>
                                    Apple_4
                                </span>
                                <span class="CreateSampleCheckBox float-right">
                                    <input class="mr-2" style="width: 30px; height: 26px; vertical-align: middle;" type="checkbox" id="Watermark" name="Watermark" value="Watermark">

                                </span>
                            </div>
                            <div class="col-2">
                                <span>
                                    <i class="fa fa-ellipsis-v fa-sm float-right mt-2" aria-hidden="true"></i>
                                </span>
                            </div>

                        </div>
                    </li> -->

                    <li class="nav-item tablinks px-4 py-3" onclick="openTabLink(event, 'dashboard')" id="addNewChapterBtn">

                        <div class="row">
                            <div class="col-10">
                                <span class="mr-3">
                                    <i class="fa fa-plus-circle fa-lg" aria-hidden="true"></i>
                                </span>
                                <span>
                                    Add New Chapter
                                </span>
                            </div>


                        </div>
                    </li>

                </ul>
                
            </div>

            <div class="CCrightSection mt-4 mt-md-0 " style="width:68%">
                <div class="rightSection-header px-4 px-sm-4 py-sm-3">
                    <div class="row">
                        <div class="col-sm-8 mb-2">
                            <span class="mr-3">
                                <img width="27px" src="icons/menu.png" alt="" srcset="">
                            </span>
                            <span>Courses</span>
                        </div>

                        <div class="col-12 col-sm-7 col-lg-4 d-fle ">
                            <button class="CC-cta-btn-rc px-4 mb-2 mr-3 float-right">Save</button>

                            <button class="CC-cta-btn-rc mr-2 mb-2 mr-0 float-right"> <img width="22px" height="20px" src="icons/Icon_FILL copy 3.png" class="my-auto" alt="" srcset="">
                                Public
                                Course</button>

                        </div>

                    </div>
                </div>
                <div>

                </div>
                <!--Try Work start-->
                <div id="try" class="tabcontent CCtabSections">
                    <div class="container mt-3 mb-3">
                        <div class="row" style="text-align: center;">
                            <div class="container m-2 bg-light mt-5 pt-5 pb-5 mb-5">
                                <div class="row justify-content-center">
                                    <div class="col-lg-12 mb-2">
                                        <img style="max-height: 40px" src="img/plus-removebg-preview.png" alt="">
                                    </div>
                                    <div class="col-lg-12 mt-2">
                                        Add After Chapter
                                    </div>
                                    <div class="col-lg-12 pt-3 mt-3 pj-chapter">
                                        <p>Use Headings for adding the Chapter Heading and Chapter item for adding Chapter Content</p>
                                    </div>
                                    <div class="col mt-2 pt-2">

                                        <button type="button" class="Add_First_Chapter_bttn bg-light pl-2 pr-2 ml-2 mr-2" onclick="openTabLink(event, 'dashboard')" id="addNewChapterBtn4">Add First Chapter</button>

                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>

                <!--Try work end-->




                <div id="CCApple_1" class="tabcontent CCtabSections">
                    <!-- <form action=""> -->

                    <label for="courseTitle">Title:*</label> <br>
                    <input type="text" name="courseTitle" id="courseTitleVal" placeholder="Apple_1">
                    <input type="hidden" name="courseIDD" id="courseIDD">


                    <br><br>
                    <label for="courseTitle">Tags comma saparated for multiple tags</label> <br>

                    <input type="text" id="tagsInput" value="" />


                    <br><br>


                    <span>Availability Settings:*</span>
                    <br>
                    <input style="width: 20px; vertical-align: middle;" type="radio" id="alwayAvail" name="availSettings" value="alwayAvail" onclick="show1()">
                    <label class="mr-2" for="alwayAvail">Always Available</label>
                    <input style="width: 20px; vertical-align: middle;" type="radio" id="timeBased" name="availSettings" value="timeBased" onclick="show2()">
                    <label for="timeBased">Time Based</label><br>

                    <div id="courseTimings-a" class="courseTimingsClass">
                        <br>
                        <label for="fromDate">Available From:*</label>
                        <input type="date" id="availFromDate" name="fromDate">
                        <br><br>

                        <label for="endDate">Available Till:*</label>
                        <input type="date" id="availEndDate" name="endDate">

                    </div>
                    <br>
                    <button class="CC-cta-btn-rc px-4 mb-2 mr-3 float-right" id="saveDetails">Save</button>

                    <br><br>
                    <iframe width="100%" height="500px" id="iframeShow" src="">
                    </iframe>
                    <!-- </form> -->

                </div>

                <!-- <div id="CCTextEditing_02" class="tabcontent CCtabSections">
                    <form action="">
                        <label for="courseTitle">Title:*</label> <br>
                        <input type="text" name="courseTitle" placeholder="Apple_1">

                        <br><br>
                        <label for="courseTitle">Tags comma saparated for multiple tags</label> <br>
                        <input type="text" value="" data-role="tagsinput" />

                        <br><br>

                        <input class="mr-2" style="width: 30px; vertical-align: middle;" type="checkbox" id="Watermark" name="Watermark" value="Watermark">
                        <label style="margin-bottom: 0px;" for="Watermark">Enable Sharing</label>
                        <br>

                        <br>
                        <span>Availability Settings:*</span>
                        <br>
                        <input style="width: 20px; vertical-align: middle;" type="radio" id="alwayAvail" name="availSettings" value="alwayAvail" onclick="show1()">
                        <label class="mr-2" for="alwayAvail">Alwayes Available</label>
                        <input style="width: 20px; vertical-align: middle;" type="radio" id="timeBased" name="availSettings" value="timeBased" onclick="show2()">
                        <label for="timeBased">Time Based</label><br>



                        <div id="courseTimings-a1" class="courseTimingsClass">
                            <br>
                            <label for="fromDate">Available From:*</label>
                            <input type="date" id="availFromDate" name="fromDate">
                            <br><br>

                            <label for="endDate">Available Till:*</label>
                            <input type="date" id="availEndDate" name="endDate">

                        </div>

                        <br><br>
                        <iframe width="100%" height="500px" src="https://www.youtube.com/watch?v=LXb3EKWsInQ" allowfullscreen>
                        </iframe>
                    </form>

                </div>

                <div id="CCApple_3" class="tabcontent CCtabSections">
                    <form action="">
                        <label for="courseTitle">Title:*</label> <br>
                        <input type="text" name="courseTitle" placeholder="Apple_1">

                        <br><br>
                        <label for="courseTitle">Tags comma saparated for multiple tags</label> <br>
                        <input type="text" value="" data-role="tagsinput" />

                        <br><br>

                        <input class="mr-2" style="width: 30px; vertical-align: middle;" type="checkbox" id="Watermark" name="Watermark" value="Watermark">
                        <label style="margin-bottom: 0px;" for="Watermark">Enable Dynamic Watermark (Only works in
                            Integrated video player)</label>
                        <br>

                        <br>
                        <span class="mr-2">Discription</span>
                        <label class="switch" id="textEditorBtn1">
                            <input type="checkbox">
                            <span class="slider round"></span>
                        </label>
                        <span class="ml-2">HTML Support</span>

                        <input id="simpleText1" style="height: 130px;" type="text" name="discription" placeholder="">
                        <textarea id="summernote1" class="summernote" name="editordata"></textarea>

                        <br><br>
                        <label class="switch">
                            <input type="checkbox" onclick="addCaptionFun()">
                            <span class="slider round"></span>
                        </label>
                        <span class="ml-2">Enable Captions</span>

                        <button id="addCaptionBtn" class="float-right addCaptionBtn">Add Caption</button>
                        <br> <br>
                        <div id="addCaptionBlock">
                            <div>
                                <span>Your Added Captions will appear here</span><br>
                                <span style="color: #888;">Click the button to add a caption.</span><br>
                                <button id="addCaptionBtn1" class="addCaptionBtn">Add Caption</button>

                            </div>

                        </div>


                        <span>Autoplay:*</span>
                        <br>
                        <input style="width: 20px; vertical-align: middle;" type="radio" id="autoYes" name="AutoPlay" value="autoYes">
                        <label class="mr-2" for="autoYes">Yes</label>
                        <input style="width: 20px; vertical-align: middle;" type="radio" id="autoNo" name="AutoPlay" value="autoNo">
                        <label for="autoNo">No</label><br>

                        <br>
                        <span>Availability Settings:*</span>
                        <br>
                        <input style="width: 20px; vertical-align: middle;" type="radio" id="alwayAvail" name="availSettings" value="alwayAvail" onclick="show1()">
                        <label class="mr-2" for="alwayAvail">Alwayes Available</label>
                        <input style="width: 20px; vertical-align: middle;" type="radio" id="timeBased" name="availSettings" value="timeBased" onclick="show2()">
                        <label for="timeBased">Time Based</label><br>



                        <div id="courseTimings-a2" class="courseTimingsClass">
                            <br>
                            <label for="fromDate">Available From:*</label>
                            <input type="date" id="availFromDate" name="fromDate">
                            <br><br>

                            <label for="endDate">Available Till:*</label>
                            <input type="date" id="availEndDate" name="endDate">

                        </div>

                        <br><br>
                        <iframe width="100%" height="500px" src="https://www.youtube.com/watch?v=LXb3EKWsInQ">
                        </iframe>
                    </form>

                </div>

                <div id="CCApple_4" class="tabcontent CCtabSections">
                    <form action="">
                        <label for="courseTitle">Title:*</label> <br>
                        <input type="text" name="courseTitle" placeholder="Apple_1">

                        <br><br>
                        <label for="courseTitle">Tags comma saparated for multiple tags</label> <br>
                        <input type="text" value="" data-role="tagsinput" />

                        <br><br>

                        <input class="mr-2" style="width: 30px; vertical-align: middle;" type="checkbox" id="Watermark" name="Watermark" value="Watermark">
                        <label style="margin-bottom: 0px;" for="Watermark">Enable Dynamic Watermark (Only works in
                            Integrated video player)</label>
                        <br>

                        <br>
                        <span class="mr-2">Discription</span>
                        <label class="switch" id="textEditorBtn2">
                            <input type="checkbox">
                            <span class="slider round"></span>
                        </label>
                        <span class="ml-2">HTML Support</span>

                        <input id="simpleText2" style="height: 130px;" type="text" name="discription" placeholder="">
                        <textarea id="summernote2" class="summernote" name="editordata"></textarea>

                        <br><br>
                        <label class="switch">
                            <input type="checkbox" onclick="addCaptionFun()">
                            <span class="slider round"></span>
                        </label>
                        <span class="ml-2">Enable Captions</span>

                        <button id="addCaptionBtn" class="float-right addCaptionBtn">Add Caption</button>
                        <br> <br>
                        <div id="addCaptionBlock">
                            <div>
                                <span>Your Added Captions will appear here</span><br>
                                <span style="color: #888;">Click the button to add a caption.</span><br>
                                <button id="addCaptionBtn1" class="addCaptionBtn">Add Caption</button>

                            </div>

                        </div>


                        <span>Autoplay:*</span>
                        <br>
                        <input style="width: 20px; vertical-align: middle;" type="radio" id="autoYes" name="AutoPlay" value="autoYes">
                        <label class="mr-2" for="autoYes">Yes</label>
                        <input style="width: 20px; vertical-align: middle;" type="radio" id="autoNo" name="AutoPlay" value="autoNo">
                        <label for="autoNo">No</label><br>

                        <br>
                        <span>Availability Settings:*</span>
                        <br>
                        <input style="width: 20px; vertical-align: middle;" type="radio" id="alwayAvail" name="availSettings" value="alwayAvail" onclick="show1()">
                        <label class="mr-2" for="alwayAvail">Alwayes Available</label>
                        <input style="width: 20px; vertical-align: middle;" type="radio" id="timeBased" name="availSettings" value="timeBased" onclick="show2()">
                        <label for="timeBased">Time Based</label><br>



                        <div id="courseTimings-a3" class="courseTimingsClass">
                            <br>
                            <label for="fromDate">Available From:*</label>
                            <input type="date" id="availFromDate" name="fromDate">
                            <br><br>

                            <label for="endDate">Available Till:*</label>
                            <input type="date" id="availEndDate" name="endDate">

                        </div>
                        <br>
                        <button>Save</button>

                        <br><br>
                        <iframe width="100%" height="500px" src="https://www.youtube.com/watch?v=LXb3EKWsInQ">
                        </iframe>
                    </form>

                </div> -->



            </div>

        </div>

    </div>

    <div id="previewCourseSection" class="previewCourse-block">
        <div class="row">
            <div class="CCSidebar col-12 col-md-3 pr-0">
                <button id="priviewCourseBtn" onclick="previewCourse()" class="backToCourseBtn"><img style="width: 40px; margin-right: 20px;" src="icons/back1.png" alt="" srcset=""> Back To
                    Course</button>

                <ul class="navbar-nav">
                    <div id="previewcoursesec"></div>
                    <!-- <li class="apple1TabLink nav-item tablinks1 pl-5 py-3 active-b" onclick="openTabLink1(event, 'CCApple_1-1')" id="defaultOpen1">

                        <div class="row">
                            <div class="col-10">
                                <span class="mr-3 align-middle">
                                    <img width="30px" src="icons/Icon_FILL copy.png" alt="" srcset="">
                                </span>
                                <span>
                                    Apple_1
                                </span>
                            </div>

                        </div>
                    </li> -->

                    <!-- <li class="textEditingTabLink nav-item tablinks1 pl-5 py-3" onclick="openTabLink1(event, 'CCTextEditing_02-1')" id="textEditingTabLink">

                        <div class="row">
                            <div class="col-10">



                                <span class="mr-3 align-middle">
                                    <img width="30px" src="icons/Icon_FILL copy 2.png" alt="" srcset="">
                                </span>
                                <span>
                                    Text Editing_02
                                </span>
                            </div>


                        </div>
                    </li>

                    <li class="nav-item tablinks1 pl-5 py-3" onclick="openTabLink1(event, 'CCApple_3-1')" id="apple3TabLink">

                        <div class="row">
                            <div class="col-10">


                                <span class="mr-3 align-middle">
                                    <img width="30px" src="icons/Icon_FILL copy.png" alt="" srcset="">
                                </span>
                                <span>
                                    Apple_3
                                </span>
                            </div>


                        </div>
                    </li>

                    <li class="nav-item tablinks1 pl-5 py-3" onclick="openTabLink1(event, 'CCApple_4-1')" id="apple4TabLink">

                        <div class="row">
                            <div class="col-10">



                                <span class="mr-3 align-middle">
                                    <img width="30px" src="icons/Icon_FILL copy.png" alt="" srcset="">
                                </span>
                                <span>
                                    Apple_4
                                </span>
                            </div>


                        </div>
                    </li> -->

                </ul>
            </div>
            <div class="CCrightSection mt-4 mt-md-0 col-12 col-md-8">
                <div class="rightSection-header px-4 px-sm-4 py-sm-3">
                    <div class="row">
                        <div class="col-sm-8 mb-2">
                            <span class="mr-3">
                                <img width="27px" src="icons/menu.png" alt="" srcset="">
                            </span>
                            <span>Preview Name</span>
                        </div>

                        <div class="col-12 col-sm-7 col-lg-4 d-flex justify-content-center">
                            <button id="prevButton" onclick="prevTabLink()" class="CC-cta-btn-rc1 mr-3"><span class="mr-3">
                                    <img width="27px" src="icons/pre.png" alt="" srcset="">
                                </span>Previous</button>
                            <button id="nextButton" onclick="nextTabLink()" class="CC-cta-btn-rc2 px-2">Next<span>
                                    <img width="27px" src="icons/next.png" alt="" srcset="">
                                </span></button>

                        </div>

                    </div>
                </div>

                <div id="CCApple_1-1" class="tabcontent1 CCtabSections">
                    <br>
                    <iframe width="100%" height="500px" id="iframeShow1" src="https://www.youtube.com/watch?v=LXb3EKWsInQ">
                    </iframe>
                    <span id="TitleShow"></span>
                    <!-- <h4>Apple_1</h4> -->

                </div>

                <!-- <div id="CCTextEditing_02-1" class="tabcontent1 CCtabSections">
                    <div style="background-color: #f7f7f7; padding: 10px;">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam vitae, sapiente deserunt
                            architecto
                            obcaecati sed dolor quod repellat hic eum tenetur perferendis itaque, aperiam minima natus
                            debitis illum sequi! Adipisci.</p>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam, minima non nemo placeat quam
                            mollitia iusto dolorem. Nobis ab repellat delectus et tempora nam quia recusandae omnis
                            repudiandae, animi libero.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, nulla, corporis voluptas illo
                            aliquam ipsum expedita voluptatem distinctio sunt earum numquam dignissimos ullam maxime
                            consequuntur excepturi tenetur! Praesentium, nobis perferendis!</p>
                    </div>
                    <h4>TextEditing_02</h4>

                </div>

                <div id="CCApple_3-1" class="tabcontent1 CCtabSections">
                    <br>
                    <iframe width="100%" height="500px" src="https://www.youtube.com/watch?v=LXb3EKWsInQ">
                    </iframe>
                    <h4>Apple_3</h4>

                </div>

                <div id="CCApple_4-1" class="tabcontent1 CCtabSections">
                    <br>
                    <iframe width="100%" height="500px" src="https://www.youtube.com/watch?v=LXb3EKWsInQ">
                    </iframe>
                    <h4>Apple_4</h4>

                </div> -->



            </div>
        </div>
    </div>



    <div id="CCmodal" class="CCmodal">

        <!-- Modal content -->
        <div class="CCmodal-content col-10 col-md-6">
            <span class="close">&times;</span>

            <div class="CCfileBlock">
                <input class="CCfileInput" type="file" id="myfileV" name="myfile"><br>
                <p>Note: Cover Size should be 600x400. Maximum Image Size should be 100kb.</p>
                <div>

                    <button class="CC-cta-btn-rc float-right" type="submit" id="imageUploadV">Upload</button>
                    <!-- <button class="CC-cta-btn-rc float-right mr-2" style="background-color: #adb3bb;">Cancel</button> -->
                </div>



            </div>


        </div>

    </div>
    <div id="new_chapter" class="CCmodal">

        <!-- Modal content -->
        <div class="addNewChapterModal-content col-10 col-sm-10 col-md-8">
            <span class="close">&times;</span>
            <div class="row">
                <div class="col-12 col-md-6">
                    <h3 class="mb-4 font-weight-bold"> Upload New Item</h3>

                    <div id="addPdfBtn" class="uploadType">
                        <div class="redCircle-a mr-2"></div>
                        <p>PDF:<span class="typeDesc-a">
                                Add a PDF file in the course.
                            </span> </p>
                    </div>
                    <br><br>

                    <div id="addVideoBtn" class="uploadType">
                        <div class="redCircle-a mr-2"></div>
                        <p>Video:<span class="typeDesc-a">
                                All uploaded videos are completely secure and non downloadable. It can also be used to
                                embed YouTube and Vimeo videos.
                            </span> </p>
                    </div>
                    <br><br>

                    <div id="addAudioBtn" class="uploadType">
                        <div class="redCircle-a mr-2"></div>
                        <p>Audio</p>
                    </div>
                    <br><br>

                    <div id="addScormBtn" class="uploadType">
                        <!-- <div class="redCircle-a mr-2"></div>
                        <p>SCORM:<span class="typeDesc-a">
                                Import SCORM packages in the course. For more information on SCORM, please visit here :
                                https://en.wikipedia.org/wiki/ Sharable_Content_Object_Reference_Model
                            </span> </p> -->
                    </div>
                    <br><br>

                    <div id="addFileBtn" class="uploadType">
                        <div class="redCircle-a mr-2"></div>
                        <p>File:<span class="typeDesc-a">
                                Add any file type for learners to download.
                            </span> </p>
                    </div>
                    <br><br>

                </div>
                <div class="col-12 col-md-6">
                    <h3 class="mb-4 font-weight-bold">Create New Item</h3>

                    <div id="addTextBtn3" class="uploadType">
                        <div class="redCircle-a mr-2"></div>
                        <p>Heading:<span class="typeDesc-a">
                                Define your chapter or section headings.
                            </span> </p>
                    </div>
                    <br><br>

                    <div id="addTextBtn" class="uploadType">
                        <div class="redCircle-a mr-2"></div>
                        <p>Text:<span class="typeDesc-a">
                                Create your texual lessons in the course. It can also be used to embed iFrame, add HTML
                                code through the Source option.
                            </span> </p>
                    </div>
                    <br><br>


                    <div id="addLinkBtn" class="uploadType">
                        <div class="redCircle-a mr-2"></div>
                        <p>Link:<span class="typeDesc-a">
                                Add Link which will be embedded in iFrame.
                            </span> </p>
                    </div>
                    <br><br>





                </div>

            </div>

        </div>
    </div>

    <div id="addNewChapterModal" class="CCmodal">

        <!-- Modal content -->
        <div class="addNewChapterModal-content col-10 col-sm-10 col-md-8">
            <span class="close">&times;</span>
            <div class="row">
                <div class="col-12 col-md-6">
                    <h3 class="mb-4 font-weight-bold">Upload New Item</h3>

                    <div id="addPdfBtn-pk11" class="uploadType">
                        <div class="redCircle-a mr-2"></div>
                        <p>PDF:<span class="typeDesc-a">
                                Add a PDF file in the course.
                            </span> </p>
                    </div>
                    <br><br>

                    <div id="addVideoBtn-pk12" class="uploadType">
                        <div class="redCircle-a mr-2"></div>
                        <p>Video:<span class="typeDesc-a">
                                All uploaded videos are completely secure and non downloadable. It can also be used to
                                embed YouTube and Vimeo videos.
                            </span> </p>
                    </div>
                    <br><br>

                    <div id="addAudioBtn-pk13" class="uploadType">
                        <div class="redCircle-a mr-2"></div>
                        <p>Audio</p>
                    </div>


                    <br><br>

                    <!-- <div id="addScormBtn-pk14" class="uploadType">
                        <div class="redCircle-a mr-2"></div>
                        <p>SCORM:<span class="typeDesc-a">
                                Import SCORM packages in the course. For more information on SCORM, please visit here :
                                https://en.wikipedia.org/wiki/ Sharable_Content_Object_Reference_Model
                            </span> </p>
                    </div>
                    <br><br> -->

                    <div id="addFileBtn-pk15" class="uploadType">
                        <div class="redCircle-a mr-2"></div>
                        <p>File:<span class="typeDesc-a">
                                Add any file type for learners to download.
                            </span> </p>
                    </div>
                    <br><br>

                </div>
                <div class="col-12 col-md-6">
                    <h3 class="mb-4">Create New Item</h3>

                    <div id="addTextBtn3-pk16" class="uploadType">
                        <div class="redCircle-a mr-2"></div>
                        <p>Heading:<span class="typeDesc-a">
                                Define your chapter or section headings.
                            </span> </p>
                    </div>
                    <br><br>

                    <div id="addTextBtn-pk17" class="uploadType">
                        <div class="redCircle-a mr-2"></div>
                        <p>Text:<span class="typeDesc-a">
                                Create your texual lessons in the course. It can also be used to embed iFrame, add HTML
                                code through the Source option.
                            </span> </p>
                    </div>
                    <br><br>


                    <div id="addTextBtn-pk18" class="uploadType">
                        <div id="addLinkBtn-pk8" class="redCircle-a mr-2"></div>
                        <p>Link:<span class="typeDesc-a">
                                Add Link which will be embedded in iFrame.
                            </span> </p>
                    </div>
                    <br><br>





                </div>

            </div>

        </div>
    </div>


    <!-- <div id="uploadVideoModal" class="CCmodal">
        <div class="uploadVideoModal-content col-10 col-lg-6">

            <span class="close-z">&times;</span>
            <h5><strong>New Video</strong></h5>
            <input class="mr-2" style="width: 22px; height: 22px; vertical-align: middle;" type="radio" id="uploadV" name="upVideo" value="autoYes" checked>
            <label class="mr-4" for="autoYes">Upload</label>

            <input class="mr-2" style="width: 22px; height: 22px; vertical-align: middle;" type="radio" id="upYoutube" name="upVideo" value="autoNo">
            <label class="mr-4" for="autoNo">YouTube</label>

            <input class="mr-2" style="width: 22px; height: 22px; vertical-align: middle;" type="radio" id="upVimeo" name="upVideo" value="autoNo">
            <label class="mr-4" for="autoNo">Vimeo</label>

            <input class="mr-2" style="width: 22px; height: 22px; vertical-align: middle;" type="radio" id="upLink" name="upVideo" value="autoNo">
            <label class="mr-4" for="autoNo">Link</label>


            <br> <br>


            <div class="uploadVideoBlock">
                <input class="CCfileInput" type="file" id="viUpload" name="viUp"><br>
                <div>
                    <button class="CC-cta-btn-rc float-right" style="width: 100px;" type="submit">Upload</button>
                    <button class="CC-cta-btn-rc float-right mr-2" style="background-color: #adb3bb; width: 100px; ">Clear</button>
                </div>
                <br><br>
                <h4>&nbsp; Or &nbsp;</h4>
                <br>

                <div style="text-align: center;">

                    <button class="viUploadBtn mr-2 mb-2" type="button"><img style="width: 22px;" src="icons/google-drive_icon.png" alt="" srcset=""> Google Drive</button>

                    <button class="viUploadBtn mb-2" type="button"><img style="width: 22px;" src="icons/dropbox_icon.png" alt="" srcset="">Dropbox</button>
                </div>
            </div>

            <div class="youTubeLinkBlock">

                <label for="youTubeLink">YouTube Link</label> <br>
                <input type="text" name="youTubeLink" placeholder="YouTube Link">
                <span>eg. https://www.youtube.com/watch?v=LXb3EKWsInQ&t=3s</span>

                <br>
                <br>
                <input type="text" name="linkTitle" placeholder="Title">
                <br>
                <br>
                <div>
                    <button class="CC-cta-btn-rc float-right" type="submit">Upload</button>
                    <button class="CC-cta-btn-rc float-right mr-2" style="background-color: #adb3bb; width: 100px;">Clear</button>
                </div>

            </div>

            <div class="vimeoLinkBlock">

                <label for="vimeoLink">Vimeo Link</label> <br>
                <input type="text" name="vimeoLink" placeholder="Vimeo Link">
                <span>eg. https://vimeo.com/93003441</span>

                <br>
                <br>
                <input type="text" name="linkTitle" placeholder="Title">
                <br>
                <br>
                <div>
                    <button class="CC-cta-btn-rc float-right" type="submit">Upload</button>
                    <button class="CC-cta-btn-rc float-right mr-2" style="background-color: #adb3bb; width: 100px;">Clear</button>
                </div>

            </div>

            <div class="linkBlock">

                <label for="Link">Link</label> <br>
                <input type="text" name="Link" placeholder="Link">
                <span>eg. https://www.w3schools.com/html/html_intro.asp</span>

                <br>
                <br>
                <input type="text" name="linkTitle" placeholder="Title">
                <br>
                <br>
                <div>
                    <button class="CC-cta-btn-rc float-right" type="submit">Upload</button>
                    <button class="CC-cta-btn-rc float-right mr-2" style="background-color: #adb3bb; width: 100px;">Clear</button>
                </div>

            </div>

        </div>
    </div> -->

    <!-- //Priya edit start on modal -->
    <div id="uploadVideoModal-priya" class="CCmodal">
        <div class="uploadVideoModal-content col-10 col-lg-6">

            <span class="close-z">&times;</span>
            <h5><strong>New PDF</strong></h5>
            <input class="mr-2" style="width: 22px; height: 22px; vertical-align: middle;" type="radio" id="uploadV" name="upVideo" value="autoYes" checked>
            <label class="mr-4" for="autoYes">Upload</label>
            <br> <br>


            <div class="uploadVideoBlock">
                <input class="CCfileInput" type="file" id="PDFU" name="viUp"><br>
                <div>
                    <button class="CC-cta-btn-rc float-right" style="width: 100px;" type="submit" id="pdfUV">Upload</button>
                    <button class="CC-cta-btn-rc float-right mr-2" style="background-color: #adb3bb; width: 100px; ">Clear</button>
                </div>
                <div class="progressP">
                    <div class="progressbarP"></div>
                </div>



            </div>

        </div>
    </div>

    <div style="z-index: 99999999999;" id="uploadVideoModal" class="CCmodal">
        <div class="uploadVideoModal-content col-10 col-lg-6">

            <span class="close-z">&times;</span>
            <h5><strong>New Video</strong></h5>
            <input class="mr-2" style="width: 22px; height: 22px; vertical-align: middle;" type="radio" id="uploadV" name="upVideo" value="autoYes" checked>
            <label class="mr-4" for="autoYes">Upload</label>

            <input class="mr-2" style="width: 22px; height: 22px; vertical-align: middle;" type="radio" id="upYoutube" name="upVideo" value="autoNo">
            <label class="mr-4" for="autoNo">YouTube</label>

            <!-- <input class="mr-2" style="width: 22px; height: 22px; vertical-align: middle;" type="radio"
                        id="upVimeo" name="upVideo" value="autoNo">
                    <label class="mr-4" for="autoNo">Vimeo</label> -->

            <input class="mr-2" style="width: 22px; height: 22px; vertical-align: middle;" type="radio" id="upLink" name="upVideo" value="autoNo">
            <label class="mr-4" for="autoNo">Link</label>


            <br> <br>


            <div id="uploadVideoBlock" class="uploadVideoBlock">
                <input class="CCfileInput" type="file" id="viUploadV" accept="video/*" name=""><br>
                <div>
                    <button class="CC-cta-btn-rc float-right uploadVideoInnerBtn" style="color: white;
                            font-size: 16px;
                            font-weight: normal;" type="submit" id="videoUploadV">Upload</button>
                    <!-- <button class="CC-cta-btn-rc float-right mr-2 clearVideoNameBtn"
                                style="background-color: #adb3bb;">Clear</button> -->
                </div>
                <div class="progressV">
                    <div class="progressbarV"></div>
                </div>




            </div>


            <div class="youTubeLinkBlock">

                <label for="youTubeLinkV">YouTube Link</label> <br>
                <input id="youTubeLinkV" type="text" name="youTubeLink" placeholder="YouTube Link" value="">
                <span>eg. https://www.youtube.com/watch?v=LXb3EKWsInQ&t=3s</span>

                <br>
                <br>
                <input id="youtubeTitle" type="text" name="linkTitle" placeholder="Title" value="">
                <br>
                <br>
                <div>
                    <button class="CC-cta-btn-rc float-right uploadVideoInnerBtn" style="color: white;
                            font-size: 16px;
                            font-weight: normal;" type="submit" id="ytlink">Upload</button>
                    <button class="CC-cta-btn-rc float-right mr-2" style="background-color: #adb3bb;">Clear</button>
                </div>

            </div>

            <div class="linkBlock">

                <label for="OnlyLinkV">Link</label> <br>
                <input id="OnlyLinkV" type="text" name="Link" placeholder="Link" value="">
                <span>eg. https://www.w3schools.com/html/html_intro.asp</span>

                <br>
                <br>
                <input id="OnlyLinkTitle" type="text" name="linkTitle" placeholder="Title">
                <br>
                <br>
                <div>
                    <button class="CC-cta-btn-rc float-right uploadVideoInnerBtn" style="color: white;
                            font-size: 16px;
                            font-weight: normal;" type="submit" id="OnlyLlink">Upload</button>
                    <button class="CC-cta-btn-rc float-right mr-2" style="background-color: #adb3bb;">Clear</button>
                </div>

            </div>

        </div>
    </div>




    <!-- Priya edit end -->
    <!-- priya 2nd edit start -->
    <div id="uploadAudioModal-priya" class="CCmodal">
        <div class="uploadVideoModal-content col-10 col-lg-6">

            <span class="close-z">&times;</span>
            <h5><strong>New Audio</strong></h5>
            <input class="mr-2" style="width: 22px; height: 22px; vertical-align: middle;" type="radio" id="uploadV" name="upVideo" value="autoYes" checked>
            <label class="mr-4" for="autoYes">Upload</label>
            <br> <br>


            <div class="uploadVideoBlock">
                <input class="CCfileInput" type="file" id="uploadAV" name="viUp"><br>
                <div>
                    <button class="CC-cta-btn-rc float-right" style="width: 100px;" type="submit" id="AudioUpload">Upload</button>
                    <button class="CC-cta-btn-rc float-right mr-2" style="background-color: #adb3bb; width: 100px; ">Clear</button>
                </div>
                <div class="progressA">
                    <div class="progressbarA"></div>
                </div>


            </div>

        </div>
    </div>



    <!-- priya 2nd edit ends -->
    <!-- priya 2nd edit start -->
    <!-- <div id="uploadScormModal-priya" class="CCmodal">
        <div class="uploadVideoModal-content col-10 col-lg-6">

            <span class="close-z">&times;</span>
            <h5><strong>New SCORM</strong></h5>
            <input class="mr-2" style="width: 22px; height: 22px; vertical-align: middle;" type="radio" id="uploadV" name="upVideo" value="autoYes" checked>
            <label class="mr-4" for="autoYes">Upload</label>
            <br> <br>


            <div class="uploadVideoBlock">
                <input class="CCfileInput" type="file" id="SCORMU" name="viUp"><br>
                <div>
                    <button class="CC-cta-btn-rc float-right" style="width: 100px;" type="submit" id="scormUV">Upload</button>
                    <button class="CC-cta-btn-rc float-right mr-2" style="background-color: #adb3bb; width: 100px; ">Clear</button>
                </div>
                <div class="progressS">
                    <div class="progressbarS"></div>
                </div>



            </div>

        </div>
    </div> -->



    <!-- priya 2nd edit ends -->
    <!-- priya 2nd edit start -->
    <div id="uploadFileModal-priya" class="CCmodal">
        <div class="uploadVideoModal-content col-10 col-lg-6">

            <span class="close-z">&times;</span>
            <h5><strong>New File</strong></h5>
            <input class="mr-2" style="width: 22px; height: 22px; vertical-align: middle;" type="radio" id="uploadV" name="upVideo" value="autoYes" checked>
            <label class="mr-4" for="autoYes">Upload</label>
            <br> <br>


            <div class="uploadVideoBlock">
                <input class="CCfileInput" type="file" id="FileU" name="viUp"><br>
                <div>
                    <button class="CC-cta-btn-rc float-right" style="width: 100px;" type="submit" id="FileUV">Upload</button>
                    <button class="CC-cta-btn-rc float-right mr-2" style="background-color: #adb3bb; width: 100px; ">Clear</button>
                </div>
                <div class="progressF">
                    <div class="progressbarF"></div>
                </div>



            </div>

        </div>
    </div>



    <!-- priya 2nd edit ends -->
    <!-- priya 3rd edit starts -->
    <div id="uploadLinkModal-priya" class="CCmodal">
        <div class="uploadVideoModal-content col-10 col-lg-6">

            <span class="close-z">&times;</span>
            <h5><strong>New Link</strong></h5>


            <input class="mr-2" style="width: 22px; height: 22px; vertical-align: middle;" type="radio" id="upLink" name="upVideo" value="autoNo">
            <label class="mr-4" for="autoNo">Link</label>


            <br> <br>
            <div class="linkBlock">

                <label for="Link">Link</label> <br>
                <input type="text" id="LinkB" name="Link" placeholder="Link">
                <span>eg. https://www.w3schools.com/html/html_intro.asp</span>

                <br>
                <br>
                <input type="text" id="LinkBT" name="linkTitle" placeholder="Title">
                <br>
                <br>
                <div>
                    <button class="CC-cta-btn-rc float-right" type="submit" id="LinkBV">Submit</button>
                    <button class="CC-cta-btn-rc float-right mr-2" style="background-color: #adb3bb; width: 100px;">Clear</button>
                </div>

            </div>

        </div>
    </div>


    <!-- priya 3rd edit ends -->

    <div id="uploadTextModal" class="CCmodal">
        <div class="uploadTextModal-content col-10 col-lg-6">
            <span class="close-z">&times;</span>
            <label for="newText"><strong>New Text</strong></label> <br>
            <input type="text" id="newTxt" name="newText" placeholder="Title">
            <br>
            <br>
            <div>
                <button class="CC-cta-btn-rc float-right" type="submit" id="newTextV">Submit</button>
                <button class="CC-cta-btn-rc float-right mr-2" style="background-color: #adb3bb; width: 100px;">Clear</button>
            </div>
        </div>

    </div>
    <div id="uploadTextModal3" class="CCmodal">
        <div class="uploadTextModal-content col-10 col-lg-6">
            <span class="close-z">&times;</span>
            <label for="newText"><strong>New Heading</strong></label> <br>
            <input type="text" id="headingTxt" name="newText" placeholder="Title">
            <br>
            <br>
            <div>
                <button class="CC-cta-btn-rc float-right" type="submit" id="headingTxtV">Submit</button>
                <button class="CC-cta-btn-rc float-right mr-2" style="background-color: #adb3bb; width: 100px;">Clear</button>
            </div>
        </div>

    </div>







    <script>
    
    
        // Next/Previous Buttons Functions Start ###################

        function nextTabLink() {
            var apple = document.getElementById("CCApple_1-1");
            var textEditing = document.getElementById("CCTextEditing_02-1");
            var apple3 = document.getElementById("CCApple_3-1");
            var apple4 = document.getElementById("CCApple_4-1");

            var apple1Tab = document.getElementById("defaultOpen1");
            var textEditTab = document.getElementById("textEditingTabLink");
            var apple3Tab = document.getElementById("apple3TabLink");
            var apple4Tab = document.getElementById("apple4TabLink");


            if (apple.style.display == "inline-block") {
                apple.style.display = "none";
                textEditing.style.display = "inline-block";

                apple1Tab.classList.remove("active-b");
                textEditTab.classList.add("active-b");

            } else if (textEditing.style.display == "inline-block") {
                textEditing.style.display = "none";
                apple3.style.display = "inline-block";

                textEditTab.classList.remove("active-b");
                apple3Tab.classList.add("active-b");
            } else if (apple3.style.display == "inline-block") {
                apple3.style.display = "none";
                apple4.style.display = "inline-block";

                apple3Tab.classList.remove("active-b");
                apple4Tab.classList.add("active-b");
            } else if (apple4.style.display == "inline-block") {
                apple4.style.display = "none";
                apple.style.display = "inline-block";

                apple4Tab.classList.remove("active-b");
                apple1Tab.classList.add("active-b");
            }
        }

        function prevTabLink() {
            var apple = document.getElementById("CCApple_1-1");
            var textEditing = document.getElementById("CCTextEditing_02-1");
            var apple3 = document.getElementById("CCApple_3-1");
            var apple4 = document.getElementById("CCApple_4-1");

            var apple1Tab = document.getElementById("defaultOpen1");
            var textEditTab = document.getElementById("textEditingTabLink");
            var apple3Tab = document.getElementById("apple3TabLink");
            var apple4Tab = document.getElementById("apple4TabLink");

            if (apple.style.display == "inline-block") {
                apple.style.display = "none";
                apple4.style.display = "inline-block";

                apple1Tab.classList.remove("active-b");
                apple4Tab.classList.add("active-b");
            } else if (textEditing.style.display == "inline-block") {
                textEditing.style.display = "none";
                apple.style.display = "inline-block";

                textEditTab.classList.remove("active-b");
                apple1Tab.classList.add("active-b");


            } else if (apple3.style.display == "inline-block") {
                apple3.style.display = "none";
                textEditing.style.display = "inline-block";

                apple3Tab.classList.remove("active-b");
                textEditTab.classList.add("active-b");
            } else if (apple4.style.display == "inline-block") {
                apple4.style.display = "none";
                apple3.style.display = "inline-block";

                apple4Tab.classList.remove("active-b");
                apple3Tab.classList.add("active-b");
            }
        }
        // Next/Previous Buttons Functions End ###################
    </script>


    <script>
        function createSample() {
            var createSampleCheckBox = document.getElementsByClassName("CreateSampleCheckBox");
            var i;
            for (i = 0; i < createSampleCheckBox.length; i++) {
                if (createSampleCheckBox[i].style.display == "none" || createSampleCheckBox[i].style.display == "") {
                    createSampleCheckBox[i].style.display = "inline-block";
                } else {
                    createSampleCheckBox[i].style.display = "none";
                }

            }

        }

        function createSample1() {

            var buttonsBlock = document.getElementById("CC-buttons-block");
            if (buttonsBlock.style.display == "flex" || buttonsBlock.style.display == "" || buttonsBlock.style.display == "block") {
                buttonsBlock.style.display = "none";
                document.getElementById("sampleModeBtns").style.display = "flex";
                document.getElementById("CheckBoxView").style.display = "flex";


            }

        }

        function exitSampleMode() {
            var createSampleCheckBox = document.getElementsByClassName("CreateSampleCheckBox");
            var i;
            for (i = 0; i < createSampleCheckBox.length; i++) {
                createSampleCheckBox[i].style.display = "none";
                document.getElementById("sampleModeBtns").style.display = "none";
                document.getElementById("CC-buttons-block").style.display = "flex";

            }

        }
    </script>

    <script src="bootstrap-tagsinput.js"></script>


    <script>
        function show1() {
            document.getElementById('courseTimings-a').style.display = 'none';
            document.getElementById('courseTimings-a1').style.display = 'none';
            document.getElementById('courseTimings-a2').style.display = 'none';
            document.getElementById('courseTimings-a3').style.display = 'none';


        }

        function show2() {
            document.getElementById('courseTimings-a').style.display = 'block';
            document.getElementById('courseTimings-a1').style.display = 'block';
            document.getElementById('courseTimings-a2').style.display = 'block';
            document.getElementById('courseTimings-a3').style.display = 'block';


        }

        function addCaptionFun() {
            if (document.getElementById("addCaptionBtn").style.display === "inline-block" && document.getElementById("addCaptionBlock").style.display === "inline-block" && document.getElementById("addCaptionBtn1").style.display === "inline-block") {

                document.getElementById("addCaptionBtn").style.display = "none";
                document.getElementById("addCaptionBtn1").style.display = "none";
                document.getElementById("addCaptionBlock").style.display = "none";
            } else {
                document.getElementById("addCaptionBtn").style.display = "inline-block";
                document.getElementById("addCaptionBtn1").style.display = "inline-block";
                document.getElementById("addCaptionBlock").style.display = "inline-block";
            }
        }


        $("#textEditorBtn").click(function() {
            var note = $(".note-editor");
            if ((note.css("display") == "none") || (note.css("display") == "")) {
                note.show();
                $("#simpleText").hide();
            }
        });

        $("#textEditorBtn1").click(function() {
            var note = $(".note-editor");
            if ((note.css("display") == "none") || (note.css("display") == "")) {
                note.show();
                $("#simpleText1").hide();
            }
        });

        $("#textEditorBtn2").click(function() {
            var note = $(".note-editor");
            if ((note.css("display") == "none") || (note.css("display") == "")) {
                note.show();
                $("#simpleText2").hide();
            }
        });
    </script>

    <!-- preview Course Btn Script Start ################# -->
    <script>
        document.getElementById("previewCourseSection").style.display = "none";

        function previewCourse() {

            var previewCourseSec = document.getElementById("previewCourseSection");
            var courseContentSec = document.getElementById("courseContentSection");


            if (previewCourseSec.style.display === "none") {
                previewCourseSec.style.display = "inline-block";
                courseContentSec.style.display = "none";
            } else {
                courseContentSec.style.display = "inline-block";
                previewCourseSec.style.display = "none";
            }
        }
    </script>
    <!-- preview Course Btn Script End ################# -->




    <!-- script for Switching Sidebar links Start ###################################### -->
    <script>
        function openTabLink1(evt, tabName) {
            var i, tabcontent1, tablinks1;
            tabcontent1 = document.getElementsByClassName("tabcontent1");
            for (i = 0; i < tabcontent1.length; i++) {
                tabcontent1[i].style.display = "none";
            }
            tablinks1 = document.getElementsByClassName("tablinks1");
            for (i = 0; i < tablinks1.length; i++) {
                tablinks1[i].className = tablinks1[i].className.replace(" active-b", "");
            }
            document.getElementById(tabName).style.display = "inline-block";

            evt.currentTarget.className += " active-b";
        }
        // Get the element with id="defaultOpen" and click on it
        document.getElementById("defaultOpen1").click();
    </script>

    <!-- script for Switching Sidebar links End ###################################### -->


    <!-- script for Switching Sidebar links Start ###################################### -->
    <script>
        function openTabLink(evt, tabName) {
            var i, tabcontent, tablinks;
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active-b", "");
            }
            document.getElementById(tabName).style.display = "inline-block";

            evt.currentTarget.className += " active-b";
        }
        // Get the element with id="defaultOpen" and click on it
        document.getElementById("defaultOpen").click();
    </script>

    <!-- script for Switching Sidebar links End ###################################### -->

    <script>
        // Get the modal
        var modal = document.getElementById("CCmodal");
        var modal1 = document.getElementById("addNewChapterModal");
        var modal2 = document.getElementById("uploadVideoModal");
        var modal3 = document.getElementById("uploadTextModal");
        var modal4 = document.getElementById("new_chapter");
        var modal5 = document.getElementById("uploadTextModal3");
        var modal6 = document.getElementById("uploadVideoModal-priya");
        var modal7 = document.getElementById("uploadAudioModal-priya");
        var modal8 = document.getElementById("uploadScormModal-priya");
        var modal9 = document.getElementById("uploadFileModal-priya");
        var modal10 = document.getElementById("uploadLinkModal-priya");




        // Get the button that opens the modal
        var btn = document.getElementById("CourseCoverBtn");
        var btn1 = document.getElementById("addNewChapterBtn");
        var btn2 = document.getElementById("addVideoBtn");
        var btn3 = document.getElementById("addTextBtn");
        var btn4 = document.getElementById("addNewChapterBtn4");
        var btn5 = document.getElementById("addTextBtn3");
        var btn6 = document.getElementById("addPdfBtn");
        var btn7 = document.getElementById("addAudioBtn");
        var btn8 = document.getElementById("addScormBtn");
        var btn9 = document.getElementById("addFileBtn");
        var btn10 = document.getElementById("addLinkBtn");
        var btn11 = document.getElementById("addPdfBtn-pk11");
        var btn12 = document.getElementById("addVideoBtn-pk12");
        var btn13 = document.getElementById("addAudioBtn-pk13");
        var btn14 = document.getElementById("addScormBtn-pk14");
        var btn15 = document.getElementById("addFileBtn-pk15");
        var btn16 = document.getElementById("addTextBtn3-pk16");
        var btn17 = document.getElementById("addTextBtn-pk17");
        var btn18 = document.getElementById("addTextBtn-pk18");




        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close");
        var close_z = document.getElementsByClassName("close-z");

        var j;
        for (j = 0; j < close_z.length; j++) {
            close_z[j].onclick = function() {
                modal2.style.display = "none";
                modal3.style.display = "none";
                modal5.style.display = "none";
                modal6.style.display = "none";
                modal7.style.display = "none";
                modal8.style.display = "none";
                modal9.style.display = "none";
                modal10.style.display = "none";

            }

        }



        // When the user clicks the button, open the modal 
        btn.onclick = function() {
            modal.style.display = "block";
        }
        btn1.onclick = function() {
            modal1.style.display = "block";
        }
        btn2.onclick = function() {
            modal2.style.display = "block";
        }
        btn3.onclick = function() {
            modal3.style.display = "block";
        }
        btn4.onclick = function() {
            modal4.style.display = "block";
        }
        btn5.onclick = function() {
            modal5.style.display = "block";
        }
        btn6.onclick = function() {
            modal6.style.display = "block";
        }
        btn7.onclick = function() {
            modal7.style.display = "block";
        }
        btn8.onclick = function() {
            modal8.style.display = "block";
        }
        btn9.onclick = function() {
            modal9.style.display = "block";
        }
        btn10.onclick = function() {
            modal10.style.display = "block";
        }
        btn11.onclick = function() {
            modal6.style.display = "block";
        }
        btn12.onclick = function() {
            modal2.style.display = "block";
        }
        btn13.onclick = function() {
            modal7.style.display = "block";
        }
        btn14.onclick = function() {
            modal8.style.display = "block";
        }
        btn15.onclick = function() {
            modal9.style.display = "block";
        }
        btn16.onclick = function() {
            modal5.style.display = "block";
        }
        btn17.onclick = function() {
            modal3.style.display = "block";
        }
        btn18.onclick = function() {
            modal10.style.display = "block";
        }



        // When the user clicks on <span> (x), close the modal
        var i;
        for (i = 0; i < span.length; i++) {
            span[i].onclick = function() {
                modal.style.display = "none";
                modal1.style.display = "none";
                modal4.style.display = "none";
                modal7.style.display = "none";
                modal8.style.display = "none";
                modal9.style.display = "none";
                modal10.style.display = "none";
                // modal2.style.display = "none";
                // modal3.style.display = "none";

            }
        }


        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
            if (event.target == modal1) {
                modal1.style.display = "none";
            }
            if (event.target == modal2) {
                modal2.style.display = "none";
            }
            if (event.target == modal3) {
                modal3.style.display = "none";
            }
            if (event.target == modal4) {
                modal4.style.display = "none";
            }
            if (event.target == modal5) {
                modal5.style.display = "none";
            }
            if (event.target == modal6) {
                modal6.style.display = "none";
            }
            if (event.target == modal7) {
                modal7.style.display = "none";
            }
            if (event.target == modal8) {
                modal8.style.display = "none";
            }
            if (event.target == modal9) {
                modal9.style.display = "none";
            }
            if (event.target == modal10) {
                modal10.style.display = "none";
            }
        }
    </script>


    <script>
        $(document).ready(function() {
            $('#summernote').summernote();
            $('#summernote1').summernote();
            $('#summernote2').summernote();


        });
    </script>

    <!-- The core Firebase JS SDK is always required and must be listed first -->
    <script src="https://www.gstatic.com/firebasejs/8.4.3/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.4.3/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.4.3/firebase-firestore.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.4.3/firebase-storage.js"></script>

    <!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
    <script src="https://www.gstatic.com/firebasejs/8.4.3/firebase-analytics.js"></script>

    <script>
        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        var firebaseConfig = {
            apiKey: "AIzaSyBSUFc3uARN13oXD5YQxbMbLUDR9d4LIsQ",
            authDomain: "tutorbig.firebaseapp.com",
            databaseURL: "https://tutorbig-default-rtdb.firebaseio.com",
            projectId: "tutorbig",
            storageBucket: "tutorbig.appspot.com",
            messagingSenderId: "431502866047",
            appId: "1:431502866047:web:4ca7bd55878c9e86daf14a",
            measurementId: "G-YF0MGXLPRN"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();

        const database = firebase.firestore();
        const auth = firebase.auth();

        UserId = "<?php echo $id ?>";
        uid = "<?php echo $uid ?>";

        const dateInMillisecs = Date.now();
        dateInSecs = Math.round(dateInMillisecs / 1000);
        cbid = dateInSecs.toString();


        document.getElementById("ytlink").onclick = function() {
            const ytLinkV = document.getElementById("youTubeLinkV");
            const ytTitleV = document.getElementById("youtubeTitle");
            var blank = "";
            var icon = "icons/Icon-06.png";

            database.collection('courses').doc(UserId).collection('Courses Data').doc(uid).collection('Course Builder').doc(cbid).set({
                    Link: ytLinkV.value,
                    Title: ytTitleV.value,
                    Start: blank,
                    End: blank,
                    Tags: blank,
                    Icon: icon,

                }, {
                    merge: true
                }).then(() => {
                    console.log('data successfully written');
                    window.location.reload();
                })
                .catch(error => {
                    console.error(error)
                });


        }

        document.getElementById("OnlyLlink").onclick = function() {
            const OnlyLinkV = document.getElementById("OnlyLinkV");
            const OnlyLinkTitle = document.getElementById("OnlyLinkTitle");
            var blank = "";
            var icon = "icons/Icon-06.png";

            database.collection('courses').doc(UserId).collection('Courses Data').doc(uid).collection('Course Builder').doc(cbid).set({
                    Link: OnlyLinkV.value,
                    Title: OnlyLinkTitle.value,
                    Start: blank,
                    End: blank,
                    Tags: blank,
                    Icon: icon,

                }, {
                    merge: true
                }).then(() => {
                    console.log('data successfully written');
                    window.location.reload();
                })
                .catch(error => {
                    console.error(error)
                });


        }


        document.getElementById("headingTxtV").onclick = function() {
            const headingTxt = document.getElementById("headingTxt");
            var blank = "";
            var icon = "icons/Icon_FILL copy 2.png";


            database.collection('courses').doc(UserId).collection('Courses Data').doc(uid).collection('Course Builder').doc(cbid).set({
                    Title: headingTxt.value,
                    Start: blank,
                    End: blank,
                    Tags: blank,
                    Icon: icon,

                    // Title: OnlyLinkTitle.value,
                }, {
                    merge: true
                }).then(() => {
                    console.log('data successfully written');
                    window.location.reload();
                })
                .catch(error => {
                    console.error(error)
                });


        }

        document.getElementById("newTextV").onclick = function() {
            const newTxt = document.getElementById("newTxt");
            var blank = "";
            var icon = "icons/Icon_FILL copy 2.png";


            database.collection('courses').doc(UserId).collection('Courses Data').doc(uid).collection('Course Builder').doc(cbid).set({
                    Title: newTxt.value,
                    Start: blank,
                    End: blank,
                    Tags: blank,
                    Icon: icon,

                    // Title: OnlyLinkTitle.value,
                }, {
                    merge: true
                }).then(() => {
                    console.log('data successfully written');
                    window.location.reload();
                })
                .catch(error => {
                    console.error(error)
                });


        }

        document.getElementById("LinkBV").onclick = function() {
            const LinkB = document.getElementById("LinkB");
            const LinkBT = document.getElementById("LinkBT");
            var blank = "";
            var icon = "icons/Icon-06.png";


            database.collection('courses').doc(UserId).collection('Courses Data').doc(uid).collection('Course Builder').doc(cbid).set({
                    Link: LinkB.value,
                    Title: LinkBT.value,
                    Start: blank,
                    End: blank,
                    Tags: blank,
                    Icon: icon,

                }, {
                    merge: true
                }).then(() => {
                    console.log('data successfully written');
                    window.location.reload();
                })
                .catch(error => {
                    console.error(error)
                });


        }

        document.getElementById("saveSample").onclick = function() {
            const watermark = document.getElementById("Watermark");
            // const LinkBT = document.getElementById("LinkBT");
            var blank = "";
            var icon = "icons/Icon-06.png";


            database.collection('courses').doc(UserId).collection('Courses Data').doc(uid).collection('Course Builder').doc(cbid).set({
                    sample: watermark.value,
                    // Title: LinkBT.value,
                    // Start: blank,
                    // End: blank,
                    // Tags: blank,
                    // Icon: icon,

                }, {
                    merge: true
                }).then(() => {
                    console.log('data successfully written');
                    window.location.reload();
                })
                .catch(error => {
                    console.error(error)
                });


        }

        document.getElementById("saveDetails").onclick = function() {
            const courseTitleV = document.getElementById("courseTitleVal");
            const tagsInput = document.getElementById("tagsInput");
            const availFromDate = document.getElementById("availFromDate");
            const availEndDate = document.getElementById("availEndDate");
            const courseIDD = document.getElementById("courseIDD");


            database.collection('courses').doc(UserId).collection('Courses Data').doc(uid).collection('Course Builder').doc(courseIDD.value).update({

                    Title: courseTitleV.value,
                    Tags: tagsInput.value,
                    Start: availFromDate.value,
                    End: availEndDate.value,

                }, {
                    merge: true
                }).then(() => {
                    console.log('data successfully written');
                    window.location.reload();
                })
                .catch(error => {
                    console.error(error)
                });


        }



        document.getElementById("videoUploadV").onclick = function() {
            var blank = "";
            var icon = "icons/Icon_FILL copy.png";

            var videoU = document.getElementById("viUploadV").files[0];
            //now get your image name
            var videoName = videoU.name;
            // mastersname.value = docName;
            //firebase  storage reference
            //it is the path where yyour image will store
            var storageRef = firebase.storage().ref('CourseBuilderVideos/' + videoName);
            //upload image to selected storage reference

            var uploadTask = storageRef.put(videoU);

            uploadTask.on('state_changed', function(snapshot) {
                //observe state change events such as progress , pause ,resume
                //get task progress by including the number of bytes uploaded and total
                //number of bytes
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                document.querySelector('.progressV').style.display = "flex";
                document.querySelector('.progressbarV').style.width = `${progress}%`;

                console.log("upload is " + progress + " done");
                // alert("Successfully uploaded");
            }, function(error) {
                //handle error here
                console.log(error.message);
            }, function() {
                //handle successful uploads on complete

                uploadTask.snapshot.ref.getDownloadURL().then(function(downlaodURL) {
                    window.photoadd = downlaodURL;
                    console.log(downlaodURL);
                    database.collection('courses').doc(UserId).collection('Courses Data').doc(uid).collection('Course Builder').doc(cbid).set({
                            Link: downlaodURL,
                            Title: videoName,
                            Start: blank,
                            End: blank,
                            Tags: blank,
                            Icon: icon,

                        }, {
                            merge: true
                        }).then(() => {
                            console.log('data successfully written');
                            window.alert("Video Uploaded Successfully");

                            window.location.reload();
                        })
                        .catch(error => {
                            console.error(error)
                        });

                });
            });
        }

        document.getElementById("AudioUpload").onclick = function() {
            var blank = "";
            var icon = "icons8-audio-book-50.png";
            var audioU = document.getElementById("uploadAV").files[0];
            //now get your image name
            var audioName = audioU.name;
            // mastersname.value = docName;
            //firebase  storage reference
            //it is the path where yyour image will store
            var storageRef = firebase.storage().ref('CourseBuilderAudios/' + audioName);
            //upload image to selected storage reference

            var uploadTask = storageRef.put(audioU);

            uploadTask.on('state_changed', function(snapshot) {
                //observe state change events such as progress , pause ,resume
                //get task progress by including the number of bytes uploaded and total
                //number of bytes
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                document.querySelector('.progressA').style.display = "flex";
                document.querySelector('.progressbarA').style.width = `${progress}%`;
                console.log("upload is " + progress + " done");
                // alert("Successfully uploaded");
            }, function(error) {
                //handle error here
                console.log(error.message);
            }, function() {
                //handle successful uploads on complete

                uploadTask.snapshot.ref.getDownloadURL().then(function(downlaodURL) {
                    window.photoadd = downlaodURL;
                    console.log(downlaodURL);
                    database.collection('courses').doc(UserId).collection('Courses Data').doc(uid).collection('Course Builder').doc(cbid).set({
                            Link: downlaodURL,
                            Title: audioName,
                            Start: blank,
                            End: blank,
                            Tags: blank,
                            Icon: icon,

                        }, {
                            merge: true
                        }).then(() => {
                            console.log('data successfully written');
                            window.alert("Audio Uploaded Successfully");

                            window.location.reload();
                        })
                        .catch(error => {
                            console.error(error)
                        });

                });
            });
        }

        document.getElementById("pdfUV").onclick = function() {
            var blank = "";
            var icon = "icons/Icon_FILL copy 2.png";

            var pdfU = document.getElementById("PDFU").files[0];
            //now get your image name
            var pdfName = pdfU.name;
            // mastersname.value = docName;
            //firebase  storage reference
            //it is the path where yyour image will store
            var storageRef = firebase.storage().ref('CourseBuilderPDF/' + pdfName);
            //upload image to selected storage reference

            var uploadTask = storageRef.put(pdfU);

            uploadTask.on('state_changed', function(snapshot) {
                //observe state change events such as progress , pause ,resume
                //get task progress by including the number of bytes uploaded and total
                //number of bytes
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                document.querySelector('.progressP').style.display = "flex";
                document.querySelector('.progressbarP').style.width = `${progress}%`;
                console.log("upload is " + progress + " done");
                // alert("Successfully uploaded");
            }, function(error) {
                //handle error here
                console.log(error.message);
            }, function() {
                //handle successful uploads on complete

                uploadTask.snapshot.ref.getDownloadURL().then(function(downlaodURL) {
                    window.photoadd = downlaodURL;
                    console.log(downlaodURL);
                    database.collection('courses').doc(UserId).collection('Courses Data').doc(uid).collection('Course Builder').doc(cbid).set({
                            Link: downlaodURL,
                            Title: pdfName,
                            Start: blank,
                            End: blank,
                            Tags: blank,
                            Icon: icon,

                        }, {
                            merge: true
                        }).then(() => {
                            console.log('data successfully written');
                            window.alert("PDF Uploaded Successfully");

                            window.location.reload();
                        })
                        .catch(error => {
                            console.error(error)
                        });

                });
            });
        }

        document.getElementById("FileUV").onclick = function() {
            var blank = "";
            var icon = "icons/Icon_FILL copy 2.png";

            var fileU = document.getElementById("FileU").files[0];
            //now get your image name
            var fileName = fileU.name;
            // mastersname.value = docName;
            //firebase  storage reference
            //it is the path where yyour image will store
            var storageRef = firebase.storage().ref('CourseBuilderFile/' + fileName);
            //upload image to selected storage reference

            var uploadTask = storageRef.put(fileU);

            uploadTask.on('state_changed', function(snapshot) {
                //observe state change events such as progress , pause ,resume
                //get task progress by including the number of bytes uploaded and total
                //number of bytes
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                document.querySelector('.progressF').style.display = "flex";
                document.querySelector('.progressbarF').style.width = `${progress}%`;
                console.log("upload is " + progress + " done");
                // alert("Successfully uploaded");
            }, function(error) {
                //handle error here
                console.log(error.message);
            }, function() {
                //handle successful uploads on complete

                uploadTask.snapshot.ref.getDownloadURL().then(function(downlaodURL) {
                    window.photoadd = downlaodURL;
                    console.log(downlaodURL);
                    database.collection('courses').doc(UserId).collection('Courses Data').doc(uid).collection('Course Builder').doc(cbid).set({
                            Link: downlaodURL,
                            Title: fileName,
                            Start: blank,
                            End: blank,
                            Tags: blank,

                        }, {
                            merge: true
                        }).then(() => {
                            console.log('data successfully written');
                            window.alert("File Uploaded Successfully");

                            window.location.reload();
                        })
                        .catch(error => {
                            console.error(error)
                        });

                });
            });
        }

        // document.getElementById("scormUV").onclick = function() {
        //     var blank = "";

        //     var scormU = document.getElementById("SCORMU").files[0];
        //     //now get your image name
        //     var scormName = scormU.name;
        //     // mastersname.value = docName;
        //     //firebase  storage reference
        //     //it is the path where yyour image will store
        //     var storageRef = firebase.storage().ref('CourseBuilderScorm/' + scormName);
        //     //upload image to selected storage reference

        //     var uploadTask = storageRef.put(scormU);

        //     uploadTask.on('state_changed', function(snapshot) {
        //         //observe state change events such as progress , pause ,resume
        //         //get task progress by including the number of bytes uploaded and total
        //         //number of bytes
        //         var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //         document.querySelector('.progressS').style.display = "flex";
        //         document.querySelector('.progressbarS').style.width = `${progress}%`;
        //         console.log("upload is " + progress + " done");
        //         // alert("Successfully uploaded");
        //     }, function(error) {
        //         //handle error here
        //         console.log(error.message);
        //     }, function() {
        //         //handle successful uploads on complete

        //         uploadTask.snapshot.ref.getDownloadURL().then(function(downlaodURL) {
        //             window.photoadd = downlaodURL;
        //             console.log(downlaodURL);
        //             database.collection('courses').doc(UserId).collection('Courses Data').doc(uid).collection('Course Builder').doc(cbid).set({
        //                     Link: downlaodURL,
        //                     Title: scormName,
        //                     Start: blank,
        //                     End: blank,
        //                     Tags: blank,

        //                 }, {
        //                     merge: true
        //                 }).then(() => {
        //                     console.log('data successfully written');
        //                     window.alert("SCORM Uploaded Successfully");

        //                     window.location.reload();
        //                 })
        //                 .catch(error => {
        //                     console.error(error)
        //                 });

        //         });
        //     });
        // }

        document.getElementById("imageUploadV").onclick = function() {

            var imageU = document.getElementById("myfileV").files[0];
            //now get your image name
            var imageName = imageU.name;
            // mastersname.value = docName;
            //firebase  storage reference
            //it is the path where yyour image will store
            var storageRef = firebase.storage().ref('CourseBuilderImage/' + imageName);
            //upload image to selected storage reference

            var uploadTask = storageRef.put(imageU);

            uploadTask.on('state_changed', function(snapshot) {
                //observe state change events such as progress , pause ,resume
                //get task progress by including the number of bytes uploaded and total
                //number of bytes
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                console.log("upload is " + progress + " done");
                // alert("Successfully uploaded");
            }, function(error) {
                //handle error here
                console.log(error.message);
            }, function() {
                //handle successful uploads on complete

                uploadTask.snapshot.ref.getDownloadURL().then(function(downlaodURL) {
                    window.photoadd = downlaodURL;
                    console.log(downlaodURL);
                    database.collection('courses').doc(UserId).collection('Courses Data').doc(uid).set({
                            image: downlaodURL,
                            Title: imageName,


                        }, {
                            merge: true
                        }).then(() => {
                            console.log('data successfully written');
                            window.alert("Image Uploaded Successfully");

                            window.location.reload();
                        })
                        .catch(error => {
                            console.error(error)
                        });

                });
            });
        }

        database.collection("courses").doc(UserId).collection('Courses Data').doc(uid).collection("Course Builder").get().then((querySnapshot) => {
            
            var count = querySnapshot.size;
            var temp = "";
            var temp1 = "";

            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                // var docid = ${doc.id};
                // console.log(doc.id);
                const review = doc.data();
                temp += `
                <li class="nav-item tablinks px-4 py-3" onclick="openTabLink(event, 'CCApple_1'); viewCourseDetails('${doc.id}');" id="defaultOpen"  >

                        <div class="row">
                            <div class="col-10">
                               


                                <div style="
  white-space: nowrap; 
  width: 100%; 
  overflow: hidden;
  text-overflow: ellipsis; ">
   <span class="mr-3">
                                    <img width="22px" src="icons/next1.png" alt="" srcset="">

                                </span>
                                <span class="mr-3 align-middle">
                                    <img width="30px" src="${review.Icon}" alt="" srcset="">
                                </span>
                                    ${review.Title}
                                </div>
                                <span class="CreateSampleCheckBox float-right">
                                    <input class="mr-2 float-right" style="width: 30px; height: 28px; vertical-align: middle;" type="checkbox" id="Watermark" name="Watermark" value="${doc.id}">

                                </span>
                                
                                
                            </div>
                            <div class="col-2">
                                <span>
                                    <i class="fa fa-ellipsis-v fa-sm float-right mt-2" data-toggle="collapse" href="#collapseExample" aria-hidden="true"></i>
                                </span>
                            </div>

                        </div>
                  
<div class="collapse mt-3" id="collapseExample">
  <div class="">

<div class="d-fle">

<button type="button" class="btn bg-red btn-danger py-0  w-auto-sm-btn">Remove</button>
<button type="button" class="btn bg-red btn-danger py-0  w-auto-sm-btn">Move</button>
<button type="button" class="btn bg-red btn-danger py-0  w-auto-sm-btn reorder-down">Move Down</button>
<button type="button" class="btn bg-red btn-danger py-0  w-auto-sm-btn">New Chapter</button>
<button type="button" class="btn bg-red btn-danger py-0  w-auto-sm-btn">Rename</button>
  
</div>
<div class="text-red mt-3 font18">   
<span class="mr-3">
                                    <i class="fa fa-plus-circle fa-lg" aria-hidden="true"></i>
                                </span>
                                <span>
                                    Add Chapter Item
                                </span></div>
</div>
</div>                
                    </li>
        
                    

                    
                `


                temp1 += `
                <li class="apple1TabLink nav-item tablinks1 pl-5 py-3 active-b" onclick="openTabLink1(event, 'CCApple_1-1'); previewShow('${doc.id}')" id="defaultOpen1">

                        <div class="row">
                            <div class="col-10">
                                <span class="mr-3 align-middle">
                                    <img width="30px" src="icons/Icon_FILL copy.png" alt="" srcset="">
                                </span>
                                <div style="
  white-space: nowrap; 
  width: 100%; 
  overflow: hidden;
  text-overflow: ellipsis; ">
                                    ${review.Title}
                                </div>
                            </div>

                        </div>
                    </li>`

                    if (count > 0) {
                    document.getElementById("try").style.display = "none";
                    document.getElementById("CCApple_1").style.display = "inline-block";

                } else {
                    document.getElementById("try").style.display = "inline-block";
                }



            });
            document.getElementById("courseBuilderTitle").innerHTML = temp;
            document.getElementById("previewcoursesec").innerHTML = temp1;


        });



        function viewCourseDetails(cbid) {

            database.collection("courses").doc(UserId).collection('Courses Data').doc(uid).collection("Course Builder").doc(cbid).get().then((doc) => {

                if (doc.exists) {
                    const review = doc.data();
                    console.log(doc.data());

                    document.getElementById('courseTitleVal').value = review.Title;
                    document.getElementById('iframeShow').src = review.Link;
                    document.getElementById('courseIDD').value = cbid;
                    document.getElementById('tagsInput').value = review.Tags;
                    document.getElementById('availFromDate').value = review.Start;
                    document.getElementById('availEndDate').value = review.End;
                }
            })
        }

        function previewShow(cbid) {
            database.collection("courses").doc(UserId).collection('Courses Data').doc(uid).collection("Course Builder").doc(cbid).get().then((doc) => {
                if (doc.exists) {
                    const review = doc.data();
                    console.log(doc.data());

                    document.getElementById('TitleShow').innerHTML = `<h4> ${review.Title} </h4>`;
                    document.getElementById('iframeShow1').src = review.Link;

                }
            })
        }

        database.collection("courses").doc(UserId).collection('Courses Data').doc(uid).get().then((doc) => {
            if (doc.exists) {
                const review = doc.data();
                console.log(doc.data());
                var imageV = 'img/Students_Classroom.jpg';

                if (review.image != "") {
                    document.getElementById('tyleImg').src = review.image;
                } else {
                    document.getElementById('tyleImg').src = imageV;
                }

            }
        })
           $(".reorder-up").click(function(){
      var $current = $(this).closest('li')
      var $previous = $current.prev('li');
      if($previous.length !== 0){
        $current.insertBefore($previous);
      }
      return false;
    });

    $(".reorder-down").click(function(){
      var $current = $(this).closest('li')
      var $next = $current.next('li');
      if($next.length !== 0){
        $current.insertAfter($next);
      }
      return false;
    });
    </script>




</body>

</html>