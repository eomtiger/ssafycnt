package hellojpa;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import java.util.List;

public class JpaMain {
    public static void main(String[] args) {
        // EntityManagerFactory: 하나만 생성 어플 전체 공유
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("hello");
        // EntityManager: 요청이 올 때마다 쓰고 버림, 쓰레드 간 공유 X
        EntityManager em = emf.createEntityManager();
        // JPA 모든 데이터 변경은 트랜잭션 안에서 실행
        EntityTransaction tx = em.getTransaction();
        tx.begin();
        //Code 2
        try {
            //영속
            Member member1 = new Member(150L, "A");
            Member member2 = new Member(160L, "B");

            em.persist(member1);
            em.persist(member2);
            tx.commit();
        } catch (Exception e) {
            tx.rollback();
        } finally {
            // 사용 후엔 꼭 닫아주자
            em.close();
        }
        //Code 1
//        try {
//            // JPQL -> 객체 대상
//            List<Member> result1 = em.createQuery("select m from Member as m", Member.class)
//                    .getResultList();
//            List<Member> result2 = em.createQuery("select m from Member as m where m.name='abc'", Member.class)
//                    .setFirstResult(5)
//                    .setMaxResults(8)
//                    .getResultList();
//            // Create
////            Member member = new Member();
////            member.setId(2L);
////            member.setName("B");
////            em.persist(member);  // 스프링 쓰면 이것만 쓰고 다른건 알아서 해줌
//            // Read
//            Member findMember = em.find(Member.class, 1L);
//            // Delete
////            em.remove(findMember);
//            //Update
//            findMember.setName("abc");
//
//            tx.commit();
//        } catch (Exception e) {
//            tx.rollback();
//        } finally {
//            // 사용 후엔 꼭 닫아주자
//            em.close();
//        }
        emf.close();
    }
}
