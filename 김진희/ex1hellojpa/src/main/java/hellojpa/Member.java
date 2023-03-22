package hellojpa;

import javax.persistence.Entity;
import javax.persistence.Id;
@Entity
//@TABLE(name="MBR")
public class Member {
    @Id
    private Long id;
    private String name;
    //JPA 쓰면 동적 객체 생성, 기본 생성자 하나 있어야 함
    public Member() {

    }
    public Member(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}