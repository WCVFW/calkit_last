 package com.calzone.financial.order;

    import org.springframework.data.jpa.repository.JpaRepository;
    import java.util.List;

    public interface OrderRepository extends JpaRepository<Order, Long> {
        List findByAssigneeEmail(String assigneeEmail);
        List findByAssigneeEmailNotNull();
        List findByCustomerEmail(String customerEmail);
        List findByServiceName(String serviceName);
        List findByServiceNameAndCustomerEmail(String serviceName, String customerEmail);
        List findByUserId(Long userId); //finds the users as ids,
    }
