package com.ssafy.ssafycntuserservice.controller;

import com.ssafy.ssafycntuserservice.dto.UserDto;
import com.ssafy.ssafycntuserservice.jpa.UserEntity;
import com.ssafy.ssafycntuserservice.service.UserService;
import com.ssafy.ssafycntuserservice.vo.RequestUser;
import com.ssafy.ssafycntuserservice.vo.ResponseUser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.ResponseUtil;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/")
public class UserController {
    private Environment env;
    private UserService userService;

    public UserController(Environment env, UserService userService) {
        this.env = env;
        this.userService = userService;
    }

    /*
    서비스가 살아있는지 확인하기 위한 테스트 요청
     */
//    @Operation(summary = "서비스 헬스 체크", description = "서비스가 살아있는지 확인합니다.", tags = {"User Controller"})
//    @ApiResponses({
//            @ApiResponse(responseCode = "200", description = "OK",
//                    content = @Content(schema = @Schema(implementation = String.class))),
//            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
//            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
//            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
//    })
    @GetMapping("/health_check")
    public String status() {

        return String.format("It's working in User Service on PORT %s",
                env.getProperty("local.server.port"));
    }


    /*
    ResponseEntity 객체에 ResponseUser 개체를 보내줌으로 Modelmappp을 통해서
    UserDto에서 ResponseUser 개체의 mapping되는 컬럼만을 받는다.
     */
//    @Operation(summary = "회원 가입 요청", description = "회원 정보를 등록합니다.", tags = {"User Controller"})
//    @ApiResponses({
//            @ApiResponse(responseCode = "200", description = "OK",
//                    content = @Content(schema = @Schema(implementation = UserDto.class))),
//            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
//            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
//            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
//    })
    @PostMapping("/users")
    public ResponseEntity<ResponseUser> createUser(@RequestBody RequestUser user){
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        // user class에 맞춰서 RequestUser의 내용을 mapping 한다.
        UserDto userDto = mapper.map(user, UserDto.class);
        userService.createUser(userDto);

        // ResponseUser 클래스에 맞춰서 반환값을 전달하자.
        ResponseUser responseUser = mapper.map(userDto, ResponseUser.class);

        return ResponseEntity.status(HttpStatus.CREATED).body(responseUser);
    }


//    @Operation(summary = "회원 정보 조회", description = "모든 회원 정보 조회합니다.", tags = { "User Controller" })
//    @ApiResponses({
//            @ApiResponse(responseCode = "200", description = "OK",
//                    content = @Content(schema = @Schema(implementation = ResponseUser.class))),
//            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
//            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
//            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
//    })
    @GetMapping("/users")
    public ResponseEntity<List<ResponseUser>> getUsers() {
        Iterable<UserEntity> userList = userService.getUserByAll();

        List<ResponseUser> result = new ArrayList<>();
        userList.forEach(v -> {
            result.add(new ModelMapper().map(v, ResponseUser.class));
        });
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

//    @Operation(summary = "회원 정보 조회", description = "회원 ID를 통해 특정 회원의 정보 조회합니다.", tags = { "User Controller" })
//    @ApiResponses({
//            @ApiResponse(responseCode = "200", description = "OK",
//                    content = @Content(schema = @Schema(implementation = ResponseUser.class))),
//            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
//            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
//            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
//    })
    @GetMapping("/users/{userId}")
    public ResponseEntity<ResponseUser> getUsers(@PathVariable("userId") String userId) {
        UserDto userDto = userService.getUserByUserId(userId);

        ResponseUser returnValue = new ModelMapper().map(userDto, ResponseUser.class);

        return ResponseEntity.status(HttpStatus.OK).body(returnValue);
    }
}
