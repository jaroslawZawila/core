package couple.example;

import lombok.*;

@Data
@With
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    private String identifier;
    private String name;
    private Integer amount;
    private Long createdAt;
}
